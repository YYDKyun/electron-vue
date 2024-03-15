<template>
  <div>
    <el-row/>
    <el-row>
      <el-text class="background-title">先息后本（高利贷不认可部分本金抵扣计算器）</el-text>
    </el-row>
    <el-row justify="center">
      <el-form
          ref="ruleFormRef"
          :rules="rules"
          :model="ruleForm"
          style="width: 70%"
      >
        <el-row>
          <el-col :span="14">
            <el-form-item label="贷款金额" prop="amount">
              <el-col :span="18">
                <el-input v-model="ruleForm.amount"></el-input>
              </el-col>
              <el-col :span="1"/>
              <el-col :span="5">
                元
              </el-col>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="贷款期限" prop="deadline">
              <el-col :span="9">
                <el-input v-model.number="ruleForm.deadline"></el-input>
              </el-col>
              <el-col :span="1"/>
              <el-col :span="11">
                月(1-360)
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="约定年利率" prop="appointRate">
              <el-col :span="19">
                <el-input v-model="ruleForm.appointRate"></el-input>
              </el-col>
              <el-col :span="1"/>
              <el-col :span="4">
                %
              </el-col>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="保护年利率" prop="protectRate">
              <el-col :span="19">
                <el-input v-model.number="ruleForm.protectRate"></el-input>
              </el-col>
              <el-col :span="1"/>
              <el-col :span="4">
                %
              </el-col>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="14">
            <el-form-item label="付利周期" prop="repaymentCycle">
              <el-col :span="9">
                <el-input v-model.number="ruleForm.repaymentCycle"></el-input>
              </el-col>
              <el-col :span="1"/>
              <el-col :span="11">
                月(1-360)
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="2"/>
          <el-col :span="8">
            <el-form-item label="计算">
              <el-button :icon="Pointer" circle :loading="calculateLoading" @click="calculate()"/>
            </el-form-item>
          </el-col>
        </el-row>


      </el-form>


      <template v-if=" amountPerPeriodList && amountPerPeriodList.length != 0">
        <div style="width: 90%">
          <el-divider/>
        </div>
        <el-table :data="amountPerPeriodList" stripe style="width: 80%">
          <el-table-column type="index" min-width="10%"/>
          <el-table-column prop="principal" label="当期本金" min-width="35%" align="center"/>
          <el-table-column prop="recognizedInterest" label="认可利息" min-width="20%" align="center"/>
          <el-table-column prop="paymentInterest" label="约定利息" min-width="15%" align="center"/>
          <el-table-column prop="principalBalance" label="本金余额" min-width="30%" align="center"/>
        </el-table>
      </template>


    </el-row>

  </div>


</template>

<script setup lang="ts">
import getExport from '@/utils/export.ts'
import {ref, reactive} from "vue";
import type {FormInstance, FormRules} from 'element-plus'
import {List, Pointer} from '@element-plus/icons-vue'
import {amountPerPeriod} from '@/api/calculator'

//表单数据类型
interface RuleForm {
  //本金
  amount: string,
  //期限
  deadline: string,
  //约定利率
  appointRate: string,
  //保护利率
  protectRate: string,
  //付利周期
  repaymentCycle: string
}

//每期本金剩余返回数据类型
interface AmountPerPeriod {
  //当期本金
  principal: string,
  //实付利息
  paymentInterest: string,
  //认可利息
  recognizedInterest: string,
  //本金余额
  principalBalance: string,
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  amount: '',
  deadline: '',
  appointRate: '',
  protectRate: '',
  repaymentCycle: ''
})

const amountPerPeriodList = ref([] as AmountPerPeriod[])

const calculateLoading = ref(false)


const rules = reactive<FormRules<RuleForm>>({
  amount: [
    {required: true, message: '请输入贷款金额', trigger: 'blur'},
    {pattern: /^(\d+)(.\d{0,2})?$/, message: '贷款金额必须为合理金额'}
  ],
  deadline: [
    {required: true, message: '请输入贷款期限', trigger: 'blur'},
    {type: 'number', message: '贷款期限必须为数字'}
  ],
  appointRate: [
    {required: true, message: '请输入利率', trigger: 'blur'},
    {pattern: /^(\d+)(.\d{0,2})?$/, message: '请输入合理利率'}
  ],
  protectRate: [
    {required: true, message: '请输入利率', trigger: 'blur'},
    {pattern: /^(\d+)(.\d{0,2})?$/, message: '请输入合理利率'}
  ],
  repaymentCycle: [
    {required: true, message: '请输入还款周期', trigger: 'blur'},
    {type: 'number', message: '贷款期限必须为数字'}
  ]
})

function calculate() {
  if (!ruleFormRef.value)
    return

  ruleFormRef.value.validate(valid => {
    if (!valid)
      return
    calculateLoading.value = true
    amountPerPeriod(ruleForm).then(data => {
          calculateLoading.value = false
          amountPerPeriodList.value = data.data
        }
    ).catch(() => calculateLoading.value = false)
  })


}

const testData = []
const excelKeyName = {
  periods: '期数',
  appoint_payment: '约定月供',
  appoint_capital: '约定月供本金',
  appoint_interest: '约定月供利息',
  appoint_balance: '约定本金余额',
  interest: '受保护利息',
  capital: '实际归还本金',
  balance: '实际本金余额'
}

const exportExcel = () => {
  const exportdata = testData.map((item) => {
    const newItem = {}
    Object.keys(item).forEach((key) => {
      newItem[excelKeyName[key]] = item[key]
    })
    return newItem
  })
  getExport(exportdata)
}
</script>

<style scoped lang="less">
.background-title {
  display: flex;
  width: calc(100% - 30px);
  margin-right: 15px;
  margin-left: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  background: #e7e5e5;
  font-size: var(--el-font-size-Large);
  color: #000000;
  justify-content: center;
}

.el-row {
  margin-bottom: 20px;
}
</style>
