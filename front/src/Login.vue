<template>
  <div id="vue-main">
    <h1>LOGIN</h1>
    <hr style="margin-top: 0" />
    <div style="padding-top: 10px"></div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="" prop="phone">
        <el-input
          v-model="ruleForm.phone"
          placeholder="Phone"
          prefix-icon="el-icon-mobile-phone"
          autofocus
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="" prop="pass">
        <el-input
          clearable
          show-password
          type="password"
          v-model="ruleForm.pass"
          placeholder="Password"
          prefix-icon="el-icon-lock"
          @keyup.enter.native="submitForm"
        ></el-input>
      </el-form-item>
      <br />
      <ul class="actions special">
        <li>
          <div class="button" @click="submitForm">Sign In</div>
        </li>
      </ul>
    </el-form>
  </div>
</template>
<script>
import { Message } from 'element-ui';

function errMsg(message) {
  Message({
    message,
    type: 'error',
    center: true,
  });
}

export default {
  data() {
    const validatePhone = (rule, value, cb) => {
      if (value.trim() === '') {
        cb(new Error('Please enter phone number'));
        return;
      }
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(value)) {
        cb(new Error('Phone number format is incorrect'));
        return;
      }
      cb();
    };
    const validatePass = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('Please enter password'));
        return;
      }
      if (value.length < 6 || value.length > 16) {
        cb(new Error('Password length must between 6 to 16'));
        return;
      }
      this.$refs.ruleForm.validateField('phone');
      cb();
    };
    return {
      ruleForm: {
        phone: '',
        pass: '',
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const data = {
            phone: this.ruleForm.phone,
            password: this.ruleForm.pass,
          };
          fetch('/login', {
            body: JSON.stringify(data),
            headers: {
              'content-type': 'application/json',
            },
            method: 'POST',
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.error) {
                errMsg(res.error);
              } else if (res.returnTo) {
                location.href = res.returnTo;
              }
            })
            .catch((error) => {
              errMsg(error.message);
            });
        }
      });
    },
  },
};
</script>

<style>
.el-message {
  letter-spacing: 0;
  min-width: 0;
  max-width: 400px;
  width: 80%;
}

.el-card {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 20px;
  background-color: #f6f8fa;
  max-width: 400px;
}
.el-form-item__error {
  letter-spacing: 0;
}
</style>
