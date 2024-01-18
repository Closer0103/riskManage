<template>
  <div class="home">
    <menu-frame top-index="1" :is-show-aside="true" aside-index="4">
      <el-main>

        <!--识别对象-->
        <el-card style="margin-bottom: 2vh;" shadow="hover">
          <el-container style="width: 70vw;">
            <span style="margin-top: 1vh;width: 10vw;">请确认识别对象</span>
            <el-select v-model="IdentifiedObject" placeholder="请选择" style="width: 25vw;" filterable
                       allow-create default-first-option>
              <el-option v-for="item in IdentifiedOptions" :key="item.value" :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-container>
        </el-card>

        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="安全措施识别" name="methods">
            <!--预防性安全措施-->
            <el-card shadow="always">
              <!--卡片标题-->
              <el-container>
                <h2 style="width:15vw">预防性安全措施</h2>
                <el-tooltip class="item" effect="dark" content="添加安全措施" placement="bottom">
                  <i class="el-icon-plus" @click="preventiveDialogVisible = true"
                    style="margin-left: 4vw;margin-top: 3.8vh;font-weight: bolder;cursor: pointer;"></i>
                </el-tooltip>
              </el-container>
              <!--自定义属性对话框-->
              <el-dialog title="添加安全措施" :visible.sync="preventiveDialogVisible">
                <el-container>
                  <h4>安全措施名称</h4>
                  <el-input v-model="AttributeName" placeholder="安全措施名称" style="margin-left: 1vw;margin-top: 1vh;width: 30vw;"></el-input>
                </el-container>
                <el-container>
                  <h4>细节说明</h4>
                  <el-input v-model="AttributeDescription" placeholder="安全措施说明" style="margin-left: 1vw;margin-top: 1vh;width: 30vw;"></el-input>
                </el-container>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="preventiveDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addAttribute(1)">确 定</el-button>
                </div>
              </el-dialog>
              <!--已添加的属性列表-->
              <el-container v-for="(item, index) in preventiveAttribute" :key="index"
                            class="single-attribute">
                <el-container style="margin-left: 4vw;display: flex;align-items: center;width: 15vw;">
                  <el-tooltip class="item" effect="dark" content="移除安全措施" placement="bottom">
                    <i class="el-icon-remove-outline" @click="delAttribute(item.id, index, 1)"
                      style="margin-right: 1vw;size: 2rem;cursor: pointer;"></i>
                  </el-tooltip>
                  <h4>{{ item.name }}</h4>
                </el-container>
                <el-container style="margin-top: 3vh;position: relative;">安全措施说明：{{ item.detail }}</el-container>
              </el-container>
            </el-card>

            <!--保护性安全措施-->
            <el-card style="margin-top: 4vh;" shadow="always">
              <!--卡片标题-->
              <el-container>
                <h2 style="width:15vw">保护性安全措施</h2>
                <el-tooltip class="item" effect="dark" content="添加安全措施" placement="bottom">
                  <i class="el-icon-plus" @click="protectiveDialogVisible = true"
                    style="margin-left: 4vw;margin-top: 3.8vh;font-weight: bolder;cursor: pointer;"></i>
                </el-tooltip>
              </el-container>
              <!--自定义属性对话框-->
              <el-dialog title="添加安全措施" :visible.sync="protectiveDialogVisible">
                <el-container>
                  <h4>安全措施名称</h4>
                  <el-input v-model="AttributeName" placeholder="安全措施名称" style="margin-left: 1vw;margin-top: 1vh;width: 30vw;"></el-input>
                </el-container>
                <el-container>
                  <h4>细节说明</h4>
                  <el-input v-model="AttributeDescription" placeholder="安全措施说明" style="margin-left: 1vw;margin-top: 1vh;width: 30vw;">
                  </el-input>
                </el-container>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="protectiveDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addAttribute(2)">确 定</el-button>
                </div>
              </el-dialog>
              <!--标签列表-->
              <el-container v-for="(item, index) in protectiveAttribute" :key="index"
                            class="single-attribute">
                <el-container style="margin-left: 4vw;display: flex;align-items: center;width: 15vw;">
                  <el-tooltip class="item" effect="dark" content="移除安全措施" placement="bottom">
                    <i class="el-icon-remove-outline" @click="delAttribute(item.id, index, 2)"
                      style="margin-right: 1vw;size: 2rem;cursor: pointer;"></i>
                  </el-tooltip>
                  <h4>{{ item.name }}</h4>
                </el-container>
                <el-container style="margin-top: 3vh;position: relative;">安全措施说明：{{ item.detail }}</el-container>
              </el-container>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="安全措施评估" name="evaluate">

            <!--安全措施有效性-->
            <el-form style="margin-top: 4vh;">
              <el-form-item>
                <h2 style="width:15vw">安全措施有效性</h2>
                <h4 v-if="preventiveAttribute.length == 0 && protectiveAttribute.length == 0">暂无属性</h4>
              </el-form-item>

              <!--组织管理脆弱性-->
              <el-form-item v-if="preventiveAttribute.length != 0">
                <el-container v-for="(item, index) in preventiveAttribute" :key="index" class="single-attribute">
                  <el-container style="display: flex;align-items: center;width: 7vw;">
                    <el-tooltip class="item" effect="dark" content="移除属性" placement="bottom">
                      <i class="el-icon-remove-outline" @click="delAttribute(item.id, index, 1)"
                          style="margin-right: 1vw;size: 2rem;cursor: pointer;"></i>
                    </el-tooltip>
                    <h4>{{ item.name }}</h4>
                  </el-container>
                  <el-container>
                    <h4>安全措施有效性等级</h4>
                    <el-select v-model="item.rank" placeholder="请选择等级" style="margin-top: 1vh;margin-left:1vw;width: 10vw;">
                      <el-option
                          v-for="item in rankSetting"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-container>
                </el-container>
              </el-form-item>
            
              <!--技术管理脆弱性-->
              <el-form-item v-if="protectiveAttribute.length != 0">
                <el-container v-for="(item, index) in protectiveAttribute" :key="index" class="single-attribute">
                  <el-container style="display: flex;align-items: center;width: 7vw;">
                    <el-tooltip class="item" effect="dark" content="移除属性" placement="bottom">
                      <i class="el-icon-remove-outline" @click="delAttribute(item.id, index, 2)"
                          style="margin-right: 1vw;size: 2rem;cursor: pointer;"></i>
                    </el-tooltip>
                    <h4>{{ item.name }}</h4>
                  </el-container>
                  <el-container>
                    <h4>安全措施有效性等级</h4>
                    <el-select v-model="item.rank" placeholder="请选择等级" style="margin-top: 1vh;margin-left:1vw;width: 10vw;">
                      <el-option
                          v-for="item in rankSetting"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-container>
                </el-container>
              </el-form-item>
            </el-form>

          </el-tab-pane>
        </el-tabs>
      </el-main>
    </menu-frame>
  </div>
</template>
<!--这是风险识别模块下脆弱性识别的用户输入页面-->
<script>
import MenuFrame from "@/components/MenuFrame.vue";
import axios from "axios";
export default {
  name: 'MethodsRecView',
  components: {MenuFrame},
  data() {
    return {
      activeIndex: '1',
      activeName:'methods',
      //识别对象，需要读取资产识别中的对象，现在暂时使用固定对象进行测试
      projectId:2,
      IdentifiedOptions: [
        {
          label: "对象1",
          value: "对象1"
        },
        {
          label: "对象2",
          value: "对象2"
        },
        {
          label: "对象3",
          value: "对象3"
        },
      ],
      IdentifiedObject: '',

      //单纯作为承载输入内容的中间变量
      AttributeName: '',
      AttributeDescription:'',

      //已有安全措施相关变量
      //预防性安全措施相关变量
      preventiveDialogVisible: false,
      preventiveAttribute: [],

      //保护性安全措施相关变量
      protectiveDialogVisible: false,
      protectiveAttribute: [],
    };
  },
  methods: {
    getIdentifiedOptions() {
      var options = []
      var business = JSON.parse(localStorage.getItem("businessIdentifyInfo"))
      var system = JSON.parse(localStorage.getItem("systemIdentifyInfo"))
      var component = JSON.parse(localStorage.getItem("componentIdentifyInfo"))
      console.log(business)
      for (var item1 of business) {
        options.push({value: item1.business_name, label: item1.business_name})
      }
      for (var item2 of system) {
        options.push({value: item2.system_name, label: item2.system_name})
      }
      for (var item3 of component) {
        options.push({value: item3.component_name, label: item3.component_name})
      }
      this.IdentifiedOptions = options
    },
    async getMethodList(){
      console.log("获取项目安全措施表")
      let response;
      try {
        response = await axios.get('api/met/getMethodList', {
          params: {
            "projectId": this.projectId,
          }
        });
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        throw error;
      }
      if (response.data.msg == 'success') {
        response.data.data.forEach(element => {
          if (element.type == 1) {
            this.preventiveAttribute.push(element)
          }
          else if (element.type == 2) {
            this.protectiveAttribute.push(element)
          }
        });
      }
      return;
    },
    //管理安全措施相关函数
    async addAttribute(type) {
      console.log("上传安全措施")
      let response;
      let formData = new FormData();
      formData.append("name", String(this.AttributeName));
      formData.append("detail", String(this.AttributeDescription));
      formData.append("type", type);
      formData.append("projectId", this.projectId);
      try {
        response = await axios.post('api/met/postAttribute', formData);
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        throw error;
      }
      console.log(response.data.msg)
      if (type == 1) {
        this.preventiveDialogVisible = false;
        this.preventiveAttribute.push(
            {
              name: this.AttributeName,
              detail:this.AttributeDescription,
            }
        )
      } else if (type == 2) {
        this.protectiveDialogVisible = false;
        this.protectiveAttribute.push(
            {
              name: this.AttributeName,
              detail: this.AttributeDescription,
            }
        )
      }
      this.AttributeName = '';
      this.AttributeDescription = '';
      return;
    },
    async delAttribute(id, index, type) {
      console.log("删除安全措施")
      const delId = id
      let response;
      try {
        response = await axios.delete('api/met/deleteAttribute', {
          params: {
            "id": delId,
          }
        });
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        throw error;
      }
      console.log(response.data.msg)
      if (type == 1) {
        this.preventiveAttribute.splice(index, 1);
      } else if (type == 2) {
        this.protectiveAttribute.splice(index, 1);
      }
      return;
    },
    pd() {
      var test = localStorage.getItem("MethodsData")
      if (test == null)
        localStorage["MethodsData"] = "[]"
    },
    handlePush(index) {
      if (index == '1') {
        //this.$router.push('/methodsRec');
      } else if (index == '2') {
        this.$router.push('/methodsInfo');
      } else if (index == '3') {
        this.$router.push('/methodsEva');
      }
    },
    initPage(){
      this.getMethodList()
    }
  },
  mounted() {
    this.initPage()
    this.getIdentifiedOptions()
    this.pd()
  }
}
</script>


<style>
.website-title {
  font-family: Microsoft Yahei;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

.icon-set {
  margin-right: 0.5vw;
  margin-top: 0.5vh;
}

.rec-tag {
  margin-left: 2vw;
  margin-top: 3.1vh;
  color: rgb(99, 146, 234);
  cursor: pointer;
}

.single-attribute {
  margin-top: 2vh;
  display: flex;
}
</style>