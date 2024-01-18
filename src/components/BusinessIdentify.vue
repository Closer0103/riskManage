<template>
  <div>
    <!-- 业务识别-0-业务名称 -->
    <h1>业务名称</h1>
    <el-form :model="business" ref="form" label-width="100px" class="demo-dynamic">
      <el-form-item prop="func" label="业务名称" class="demo">
        <el-input v-model="business.name" ></el-input>
      </el-form-item>
    </el-form>
    <!-- 业务识别-1-属性识别 -->
    <h1>属性识别</h1>
    <el-form :model="business" ref="form" label-width="100px" class="demo-dynamic">
      <el-form-item prop="func" label="业务功能" class="demo">
        <el-input v-model="business.func" ></el-input>
      </el-form-item>
      <el-form-item prop="func" label="业务范围" class="demo">
        <el-input v-model="business.range" ></el-input>
      </el-form-item>
      <el-form-item prop="func" label="覆盖地域" class="demo">
        <el-input v-model="business.region" ></el-input>
      </el-form-item>
      <el-form-item prop="func" label="业务对象" class="demo">
        <el-input v-model="business.object" ></el-input>
      </el-form-item>
      <el-form-item prop="func" label="业务流程" class="demo">
        <el-input v-model="business.flow" ></el-input>
      </el-form-item>
      <el-form-item
          v-for="(attribute, index) in business.attribute"
          :label="'新属性'"
          :key="attribute.key"
          :prop="'attribute.' + index + '.value'"
      >
        <el-input v-model="attribute.name" style="width:15%" placeholder="请输入属性名"></el-input>
        <el-input v-model="attribute.value" style="width:42%"></el-input><el-button @click.prevent="removeAttribute(attribute)"><i class="el-icon-delete"></i></el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addAttribute()">新增属性</el-button>
      </el-form-item>
    </el-form>
    <!-- 业务识别-2-定位识别 -->
    <h1>定位识别</h1>
    <el-form :model="business" ref="form" label-width="160px" class="demo-dynamic">
      <el-form-item prop="func" label="业务属性与职能定位" class="demo">
        <el-input v-model="business.role" ></el-input>
      </el-form-item>
      <el-form-item prop="func" label="与发展规划目标契合度" class="demo">
        <el-select v-model="business.value_fitness" placeholder="请选择">
          <el-option
              v-for="item in business.options_fitness"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="func" label="业务布局的位置和作用" class="demo">
        <el-select v-model="business.value_layout" placeholder="请选择">
          <el-option
              v-for="item in business.options_layout"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="func" label="竞争关系中竞争力强弱" class="demo">
        <el-select v-model="business.value_competitiveness" placeholder="请选择">
          <el-option
              v-for="item in business.options_competitiveness"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
          v-for="(position, index) in business.positions"
          :label="'新定位'"
          :key="position.key"
          :prop="'positions.' + index + '.value'"
      >
        <el-input v-model="position.name" style="width:15%" placeholder="请输入定位名"></el-input>
        <el-input v-model="position.value" style="width:40%"></el-input><el-button @click.prevent="removePosition(position)"><i class="el-icon-delete"></i></el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addPosition()">新增定位</el-button>
      </el-form-item>
    </el-form>
    <!-- 业务识别-3&4-完整性和关联性识别 -->
    <h1>完整性识别</h1>
    <el-form ref="form" :model="business" label-width="100px">
      <el-form-item label="完整性等级">
        <el-select v-model="business.value_integrity" placeholder="请选择">
          <el-option
              v-for="item in business.options_integrity"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <h1>关联性识别</h1>
    <el-form ref="form" :model="business" label-width="100px">
      <el-form-item label="关联类别">
        <el-select v-model="business.value_class" placeholder="请选择">
          <el-option
              v-for="item in business.options_class"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联程度">
        <el-select v-model="business.value_relation" placeholder="请选择">
          <el-option
              v-for="item in business.options_relation"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="onSubmit">提 交</el-button>
  </div>
</template>

<script>
export default {
  name: 'BusinessIdentity',
  data() {
    return {
      business: {
        //PART 0 业务名称
        business_name: '',
        //PART 1 属性识别
        func: '',
        range: '',
        region: '',
        object: '',
        flow: '',
        attribute: [],
        //PART 2 定位识别
        role: '',
        options_fitness: [{
          value: '很高',
          label: '很高'
        }, {
          value: '高',
          label: '高'
        }, {
          value: '中',
          label: '中'
        }, {
          value: '低',
          label: '低'
        }, {
          value: '很低',
          label: '很低'
        }],
        value_fitness: '',
        options_layout: [{
          value: '很高',
          label: '很高'
        }, {
          value: '高',
          label: '高'
        }, {
          value: '中',
          label: '中'
        }, {
          value: '低',
          label: '低'
        }, {
          value: '很低',
          label: '很低'
        }],
        value_layout: '',
        options_competitiveness: [{
          value: '很高',
          label: '很高'
        }, {
          value: '高',
          label: '高'
        }, {
          value: '中',
          label: '中'
        }, {
          value: '低',
          label: '低'
        }, {
          value: '很低',
          label: '很低'
        }],
        value_competitiveness: '',
        positions: [],
        //PART 3&4 完整性和关联性识别
        options_integrity: [{
          value: '独立业务',
          label: '独立业务'
        }, {
          value: '非独立业务',
          label: '非独立业务'
        }],
        value_integrity: '',
        options_class: [{
          value: '并列关系',
          label: '并列关系'
        }, {
          value: '父子关系',
          label: '父子关系'
        }, {
          value: '间接关系',
          label: '间接关系'
        }],
        value_class: '',
        options_relation: [{
          value: '紧密关联',
          label: '紧密关联'
        }, {
          value: '非紧密关联',
          label: '非紧密关联'
        }],
        value_relation: '',
      },
    }
  },
  methods: {
    addAttribute() {
      this.business.attribute.push({
        value: '',
        key: Date.now()
      });
    },
    removeAttribute(item) {
      var index = this.business.attribute.indexOf(item)
      if (index !== -1) {
        this.business.attribute.splice(index, 1)
      }
    },
    removePosition(item) {
      var index = this.business.positions.indexOf(item)
      if (index !== -1) {
        this.business.positions.splice(index, 1)
      }
    },
    addPosition() {
      this.business.positions.push({
        value: '',
        key: Date.now()
      })
    },
    pd() {
      var test = localStorage.getItem("businessIdentifyInfo")
      if (test == null)
        localStorage["businessIdentifyInfo"] = "[]"
    },
    onSubmit() {
      var test = localStorage.getItem("businessIdentifyInfo")
      var businessIdentityList = JSON.parse(test)
      var length = businessIdentityList.length
      var business_info = {
        business_num: length + 1,
        create_time: Date(),
        business_name: this.business.name,//业务名称
        business_func: this.business.func,//业务功能
        business_range: this.business.range,//业务范围
        business_region: this.business.region,//覆盖地域
        business_object: this.business.object,//业务对象
        business_flow: this.business.flow,//业务流程
        business_attribute: this.business.attribute,//自定义属性
        business_role: this.business.role,//业务属性与职能定位
        business_fitness: this.business.value_fitness,//与发展规划目标契合度
        business_layout: this.business.value_layout,//业务布局的位置和作用
        business_competitiveness: this.business.value_competitiveness,//竞争关系中竞争力强弱
        business_position: this.business.positions,//自定义定位
        business_integrity: this.business.value_integrity, //完整性等级
        business_class: this.business.value_class,//关联类别
        business_relation: this.business.value_relation,//关联程度
      }
      businessIdentityList.push(business_info);
      localStorage["businessIdentifyInfo"] = JSON.stringify(businessIdentityList)
      console.log(business_info)
    }
  },
  mounted() {
    this.pd()
  }
}
</script>

<style scoped>
.demo{
  width: 50%;
}
</style>