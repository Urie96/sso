import 'vue';
import ElementPlus from 'element-ui';
import '../css/main.css';
import '../css/el.css';
import elem from '../html/login.html'

elem.appendTo(document.body)

function errMsg(message) {
  window.ElementPlus.ElMessage({
    message,
    type: 'error',
    center: true,
  });
}
const App = {
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
}
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount("#wrapper");
