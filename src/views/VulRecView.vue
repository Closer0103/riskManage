<!--这是风险识别模块下脆弱性识别的用户输入页面-->
<template>
  <div class="home">
    <menu-frame top-index="1" :is-show-aside="true" aside-index="3">
      <el-main>

        <el-tabs v-model="activeName" type="card">

          <!-- 1 管理脆弱性 -->
          <el-tab-pane label="管理脆弱性" name="manage">
            <!--组织管理脆弱性-->
            <el-card shadow="always">
              <!--卡片标题-->
              <el-container>
                <h2 style="width:15vw">组织管理脆弱性</h2>
                <el-tooltip class="item" effect="dark" content="添加属性" placement="bottom">
                  <i class="el-icon-plus" @click="manOrgDialogVisible = true"
                     style="margin-left: 4vw;margin-top: 3.8vh;font-weight: bolder;cursor: pointer;"></i>
                </el-tooltip>
              </el-container>
              <!--自定义属性对话框-->
              <el-dialog title="添加属性" :visible.sync="manOrgDialogVisible">
                <el-container>
                  <h4>属性名称</h4>
                  <el-input v-model="AttributeName" placeholder="脆弱性名称"
                              style="margin-left: 1vw;margin-top: 1vh;width: 40vw;">
                  </el-input>
                </el-container>
                <el-container>
                  <h4>细节说明</h4>
                  <el-input v-model="AttributeDescription" placeholder="脆弱性说明"
                             style="margin-left: 1vw;margin-top: 1vh;width: 40vw;">
                  </el-input>
                </el-container>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="manOrgDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addAttribute(7)">确 定</el-button>
                </div>
              </el-dialog>
              <!--已添加的属性列表-->
              <el-container v-for="(item, index) in manOrgAttribute" :key="index" class="single-attribute">
                <el-container style="margin-left: 4vw;display: flex;align-items: center;width: 15vw;">
                  <el-tooltip class="item" effect="dark" content="移除属性" placement="bottom">
                    <i class="el-icon-remove-outline" @click="delAttribute(item.id, index, 1)"
                       style="margin-right: 1vw;size: 2rem;cursor: pointer;"></i>
                  </el-tooltip>
                  <h4>{{ item.name }}</h4>
                </el-container>
                <el-container style="margin-top: 3vh;position: relative;">脆弱性说明：
                  <el-container v-if="item.detail != ''">{{ item.detail }}</el-container>
                  <el-container v-if="item.detail == ''">暂无说明</el-container>
                </el-container>
              </el-container>
            </el-card>

            <!--技术管理脆弱性-->
            <el-card style="margin-top: 4vh;" shadow="always">
              <!--卡片标题-->
              <el-container>
                <h2 style="width:15vw">技术管理脆弱性</h2>
                <el-tooltip class="item" effect="dark" content="添加属性" placement="bottom">
                  <i class="el-icon-plus" @click="manTecDialogVisible = true"
                     style="margin-left: 4vw;margin-top: 3.8vh;font-weight: bolder;cursor: pointer;"></i>
                </el-tooltip>
              </el-container>
              <!--自定义属性对话框-->
              <el-dialog title="添加属性" :visible.sync="manTecDialogVisible">
                <el-container>
                  <h4>属性名称</h4>
                  <el-input v-model="AttributeName" placeholder="脆弱性名称"
                              style="margin-left: 1vw;margin-top: 1vh;width: 40vw;">
                  </el-input>
                </el-container>
                <el-container>
                  <h4>细节说明</h4>
                  <el-input v-model="AttributeDescription" placeholder="脆弱性说明"
                              style="margin-left: 1vw;margin-top: 1vh;width: 40vw;">
                  </el-input>
                </el-container>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="manTecDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addAttribute(6)">确 定</el-button>
                </div>
              </el-dialog>
              <!--标签列表-->
              <el-container v-for="(item, index) in manTecAttribute" :key="index" class="single-attribute">
                <el-container style="margin-left: 4vw;display: flex;align-items: center;width: 15vw;">
                  <el-tooltip class="item" effect="dark" content="移除属性" placement="bottom">
                    <i class="el-icon-remove-outline" @click="delAttribute(item.id, index, 2)"
                       style="margin-right: 1vw;size: 2rem;cursor: pointer;"></i>
                  </el-tooltip>
                  <h4>{{ item.name }}</h4>
                </el-container>
                <el-container style="margin-top: 3vh;position: relative;">脆弱性说明：
                  <el-container v-if="item.detail != ''">{{ item.detail }}</el-container>
                  <el-container v-if="item.detail == null">暂无说明</el-container>
                </el-container>
              </el-container>
            </el-card>
          </el-tab-pane>

          <!-- 2 技术脆弱性 -->
          <el-tab-pane label="技术脆弱性" name="technique">

            <!--应用系统脆弱性-->
            <el-card shadow="always">
              <!--卡片标题-->
              <el-container>
                <h2 style="width:15vw">应用系统脆弱性</h2>
                <el-tooltip class="item" effect="dark" content="添加属性" placement="bottom">
                  <i class="el-icon-plus" @click="tecAppDialogVisible = true"
                     style="margin-left: 4vw;margin-top: 3.8vh;font-weight: bolder;cursor: pointer;"></i>
                </el-tooltip>
              </el-container>
              <!--自定义属性对话框-->
              <el-dialog title="添加属性" :visible.sync="tecAppDialogVisible">
                <el-container>
                  <h4>属性名称</h4>
                  <el-input v-model="AttributeName" placeholder="脆弱性名称"
                              style="margin-left: 1vw;margin-top: 1vh;width: 40vw;">
                  </el-input>
                </el-container>
                <el-container>
                  <h4>细节说明</h4>
                  <el-input v-model="AttributeDescription" placeholder="脆弱性说明"
                              style="margin-left: 1vw;margin-top: 1vh;width: 40vw;">
                  </el-input>
                </el-container>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="tecAppDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addAttribute(5)">确 定</el-button>
                </div>
              </el-dialog>
              <el-container v-for="(item, index) in tecAppAttribute" :key="index" class="single-attribute">
                <el-container style="margin-left: 4vw;display: flex;align-items: center;width: 15vw;">
                  <el-tooltip class="item" effect="dark" content="移除属性" placement="bottom">
                    <i class="el-icon-remove-outline" @click="delAttribute(item.id, index, 3)"
                       style="margin-right: 1vw;size: 2rem;cursor: pointer;"></i>
                  </el-tooltip>
                  <h4>{{ item.name }}</h4>
                </el-container>
                <el-container style="margin-top: 3vh;position: relative;">脆弱性说明：
                  <el-container v-if="item.detail != ''">{{ item.detail }}</el-container>
                  <el-container v-if="item.detail == ''">暂无说明</el-container>
                </el-container>
              </el-container>
            </el-card>

            <!--应用中间件脆弱性-->
            <el-card shadow="always" style="margin-top: 4vh;">
              <!--卡片标题-->
              <el-container>
                <h2 style="width:15vw">应用中间件脆弱性</h2>
                <el-tooltip class="item" effect="dark" content="添加属性" placement="bottom">
                  <i class="el-icon-plus" @click="tecMidDialogVisible = true"
                     style="margin-left: 4vw;margin-top: 3.8vh;font-weight: bolder;cursor: pointer;"></i>
                </el-tooltip>
              </el-container>
              <!--自定义属性对话框-->
              <el-dialog title="添加属性" :visible.sync="tecMidDialogVisible">
                <el-container>
                  <h4>属性名称</h4>
                  <el-input v-model="AttributeName" placeholder="脆弱性名称"
                              style="margin-left: 1vw;margin-top: 1vh;width: 40vw;">
                  </el-input>
                </el-container>
                <el-container>
                  <h4>细节说明</h4>
                  <el-input v-model="AttributeDescription" placeholder="脆弱性说明"
                              style="margin-left: 1vw;margin-top: 1vh;width: 40vw;">
                  </el-input>
                </el-container>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="tecMidDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addAttribute(4)">确 定</el-button>
                </div>
              </el-dialog>
              <el-container v-for="(item, index) in tecMidAttribute" :key="index" class="single-attribute">
                <el-container style="margin-left: 4vw;display: flex;align-items: center;width: 15vw;">
                  <el-tooltip class="item" effect="dark" content="移除属性" placement="bottom">
                    <i class="el-icon-remove-outline" @click="delAttribute(item.id, index, 4)"
                       style="margin-right: 1vw;size: 2rem;cursor: pointer;"></i>
                  </el-tooltip>
                  <h4>{{ item.name }}</h4>
                </el-container>
                <el-container style="margin-top: 3vh;position: relative;">脆弱性说明：
                  <el-container v-if="item.detail != ''">{{ item.detail }}</el-container>
                  <el-container v-if="item.detail == ''">暂无说明</el-container>
                </el-container>
              </el-container>
            </el-card>

            <!--系统软件脆弱性-->
            <el-card shadow="always" style="margin-top: 4vh;">
              <!--卡片标题-->
              <el-container>
                <h2 style="width:15vw">系统软件脆弱性</h2>
                <el-tooltip class="item" effect="dark" content="添加属性" placement="bottom">
                  <i class="el-icon-plus" @click="tecSysDialogVisible = true"
                     style="margin-left: 4vw;margin-top: 3.8vh;font-weight: bolder;cursor: pointer;"></i>
                </el-tooltip>
              </el-container>
              <!--自定义属性对话框-->
              <el-dialog title="添加属性" :visible.sync="tecSysDialogVisible">
                <el-container>
                  <h4>属性名称</h4>
                  <el-input v-model="AttributeName" placeholder="脆弱性名称"
                              style="margin-left: 1vw;margin-top: 1vh;width: 40vw;">
                  </el-input>
                </el-container>
                <el-container>
                  <h4>细节说明</h4>
                  <el-input v-model="AttributeDescription" placeholder="脆弱性说明"
                              style="margin-left: 1vw;margin-top: 1vh;width: 40vw;">
                  </el-input>
                </el-container>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="tecSysDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addAttribute(3)">确 定</el-button>
                </div>
              </el-dialog>
              <el-container v-for="(item, index) in tecSysAttribute" :key="index" class="single-attribute">
                <el-container style="margin-left: 4vw;display: flex;align-items: center;width: 15vw;">
                  <el-tooltip class="item" effect="dark" content="移除属性" placement="bottom">
                    <i class="el-icon-remove-outline" @click="delAttribute(item.id, index, 5)"
                       style="margin-right: 1vw;size: 2rem;cursor: pointer;"></i>
                  </el-tooltip>
                  <h4>{{ item.name }}</h4>
                </el-container>
                <el-container style="margin-top: 3vh;position: relative;">脆弱性说明：
                  <el-container v-if="item.detail != ''">{{ item.detail }}</el-container>
                  <el-container v-if="item.detail == ''">暂无说明</el-container>
                </el-container>
              </el-container>
            </el-card>

            <!--网络结构脆弱性-->
            <el-card shadow="always" style="margin-top: 4vh;">
              <!--卡片标题-->
              <el-container>
                <h2 style="width:15vw">网络结构脆弱性</h2>
                <el-tooltip class="item" effect="dark" content="添加属性" placement="bottom">
                  <i class="el-icon-plus" @click="tecWebDialogVisible = true"
                     style="margin-left: 4vw;margin-top: 3.8vh;font-weight: bolder;cursor: pointer;"></i>
                </el-tooltip>
              </el-container>
              <!--自定义属性对话框-->
              <el-dialog title="添加属性" :visible.sync="tecWebDialogVisible">
                <el-container>
                  <h4>属性名称</h4>
                  <el-input v-model="AttributeName" placeholder="脆弱性名称"
                              style="margin-left: 1vw;margin-top: 1vh;width: 40vw;">
                  </el-input>
                </el-container>
                <el-container>
                  <h4>细节说明</h4>
                  <el-input v-model="AttributeDescription" placeholder="脆弱性说明" style="margin-left: 1vw;margin-top: 1vh;width: 40vw;">
                  </el-input>
                </el-container>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="tecWebDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addAttribute(2)">确 定</el-button>
                </div>
              </el-dialog>
              <el-container v-for="(item, index) in tecWebAttribute" :key="index" class="single-attribute">
                <el-container style="margin-left: 4vw;display: flex;align-items: center;width: 15vw;">
                  <el-tooltip class="item" effect="dark" content="移除属性" placement="bottom">
                    <i class="el-icon-remove-outline" @click="delAttribute(item.id, index, 6)"
                       style="margin-right: 1vw;size: 2rem;cursor: pointer;"></i>
                  </el-tooltip>
                  <h4>{{ item.name }}</h4>
                </el-container>
                <el-container style="margin-top: 3vh;position: relative;">脆弱性说明：
                  <el-container v-if="item.detail != ''">{{ item.detail }}</el-container>
                  <el-container v-if="item.detail == ''">暂无说明</el-container>
                </el-container>
              </el-container>
            </el-card>

            <!--物理环境脆弱性-->
            <el-card shadow="always" style="margin-top: 4vh;">
              <!--卡片标题-->
              <el-container>
                <h2 style="width:15vw">物理环境脆弱性</h2>
                <el-tooltip class="item" effect="dark" content="添加属性" placement="bottom">
                  <i class="el-icon-plus" @click="tecEnvDialogVisible = true"
                     style="margin-left: 4vw;margin-top: 3.8vh;font-weight: bolder;cursor: pointer;"></i>
                </el-tooltip>
              </el-container>
              <!--自定义属性对话框-->
              <el-dialog title="添加属性" :visible.sync="tecEnvDialogVisible">
                <el-container>
                  <h4>属性名称</h4>
                  <el-input v-model="AttributeName" placeholder="脆弱性名称"
                              style="margin-left: 1vw;margin-top: 1vh;width: 40vw;">
                  </el-input>
                </el-container>
                <el-container>
                  <h4>细节说明</h4>
                  <el-input v-model="AttributeDescription" placeholder="脆弱性说明"
                              style="margin-left: 1vw;margin-top: 1vh;width: 40vw;">
                  </el-input>
                </el-container>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="tecEnvDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addAttribute(1)">确 定</el-button>
                </div>
              </el-dialog>
              <el-container v-for="(item, index) in tecEnvAttribute" :key="index" class="single-attribute">
                <el-container style="margin-left: 4vw;display: flex;align-items: center;width: 15vw;">
                  <el-tooltip class="item" effect="dark" content="移除属性" placement="bottom">
                    <i class="el-icon-remove-outline" @click="delAttribute(item.id, index, 7)"
                       style="margin-right: 1vw;size: 2rem;cursor: pointer;"></i>
                  </el-tooltip>
                  <h4>{{ item.name }}</h4>
                </el-container>
                <el-container style="margin-top: 3vh;position: relative;">脆弱性说明：
                  <el-container v-if="item.detail != ''">{{ item.detail }}</el-container>
                  <el-container v-if="item.detail == ''">暂无说明</el-container>
                </el-container>
              </el-container>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </menu-frame>
  </div>
</template>

<script>
import MenuFrame from "@/components/MenuFrame.vue";
import axios from "axios";
export default {
  name: 'VulRecView',
  components: {
    MenuFrame,
  },
  data() {
    return {
      //顶部导航栏
      activeIndex: '1',
      //el-tab
      activeName: 'manage',
      //识别对象，需要读取资产识别中的对象，现在暂时使用固定对象进行测试
      IdentifiedOptions: [],
      IdentifiedObject: '',

      projectId: 2,

      //单纯作为承载输入内容的中间变量
      AttributeName: '',
      AttributeDescription:'',

      //管理脆弱性相关变量
      //组织管理脆弱性相关变量
      manOrgDialogVisible: false,
      //组织管理脆弱性属性集
      manOrgAttribute: [],

      //技术管理脆弱性相关变量
      manTecDialogVisible: false,
      manTecAttribute: [],

      //技术脆弱性相关变量
      //应用系统脆弱性
      tecAppDialogVisible: false,
      tecAppAttribute: [],
      //应用中间件脆弱性
      tecMidDialogVisible: false,
      tecMidAttribute: [],
      //系统软件脆弱性
      tecSysDialogVisible: false,
      tecSysAttribute: [],
      //网络结构脆弱性
      tecWebDialogVisible: false,
      tecWebAttribute: [],
      //物理环境脆弱性
      tecEnvDialogVisible: false,
      tecEnvAttribute: [],
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
    async getVulnerabilityList(){
      console.log("获取项目脆弱性表")
      let response;
      try {
        response = await axios.get('api/vul/getVulnerabilityList', {
          params: {
            "projectId": this.projectId,
          }
        });
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        throw error;
      }
      if(response.data.msg=='success'){
        response.data.data.forEach(element => {
          if(element.type==1){
            this.tecEnvAttribute.push(element)
          }
          else if(element.type==2){
            this.tecWebAttribute.push(element)
          }
          else if(element.type==3){
            this.tecSysAttribute.push(element)
          }
          else if(element.type==4){
            this.tecMidAttribute.push(element)
          }
          else if(element.type==5){
            this.tecAppAttribute.push(element)
          }
          else if(element.type==6){
            this.manTecAttribute.push(element)
          }
          else if(element.type==7){
            this.manOrgAttribute.push(element)
          }
        });
      }
      return;
    },
    async addAttribute(type){
      console.log("上传脆弱性")
      let response;
      let formData = new FormData();
      formData.append("name", String(this.AttributeName));
      formData.append("detail", String(this.AttributeDescription));
      formData.append("type", type);
      formData.append("projectId", this.projectId);
      try {
        response = await axios.post('api/vul/postAttribute', formData);
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        throw error;
      }
      console.log(response.data.msg)
      if (type == 7) {
        this.manOrgDialogVisible = false;
        this.manOrgAttribute.push(
          {
            name: this.AttributeName,
            detail: this.AttributeDescription,
          }
        )
      } else if (type == 6) {
        this.manTecDialogVisible = false;
        this.manTecAttribute.push(
          {
            name: this.AttributeName,
            detail: this.AttributeDescription,
          }
        )
      } else if (type == 5) {
        this.tecAppDialogVisible = false;
        this.tecAppAttribute.push(
          {
            name: this.AttributeName,
            detail: this.AttributeDescription,
          }
        )
      } else if (type == 4) {
        this.tecMidDialogVisible = false;
        this.tecMidAttribute.push(
          {
            name: this.AttributeName,
            detail: this.AttributeDescription,
          }
        )
      } else if (type == 3) {
        this.tecSysDialogVisible = false;
        this.tecSysAttribute.push(
          {
            name: this.AttributeName,
            detail: this.AttributeDescription,
          }
        )
      } else if (type == 2) {
        this.tecWebDialogVisible = false;
        this.tecWebAttribute.push(
          {
            name: this.AttributeName,
            detail: this.AttributeDescription,
          }
        )
      } else if (type == 1) {
        this.tecEnvDialogVisible = false;
        this.tecEnvAttribute.push(
          {
            name: this.AttributeName,
            detail: this.AttributeDescription,
          }
        )
      }
      this.AttributeName = '';
      this.AttributeDescription = '';
    },
    async delAttribute(id,index,mode){
      console.log("删除脆弱性")
      let response;
      try {
        response = await axios.delete('api/vul/deleteAttribute', {
          params: {
            "id": id,
          }
        });
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        throw error;
      }
      console.log(response.data.msg)
      if (mode == 1) {
        this.manOrgAttribute.splice(index, 1);
      } else if (mode == 2) {
        this.manTecAttribute.splice(index, 1);
      } else if (mode == 3) {
        this.tecAppAttribute.splice(index, 1);
      } else if (mode == 4) {
        this.tecMidAttribute.splice(index, 1);
      } else if (mode == 5) {
        this.tecSysAttribute.splice(index, 1);
      } else if (mode == 6) {
        this.tecWebAttribute.splice(index, 1);
      } else if (mode == 7) {
        this.tecEnvAttribute.splice(index, 1);
      }
    },
    pd() {
      var test = localStorage.getItem("VulnerabilityData")
      if (test == null)
        localStorage["VulnerabilityData"] = "[]"
    },
    handlePush(index) {
      if (index == '1') {
        //this.$router.push('/vulRec');
      } else if (index == '2') {
        this.$router.push('/VulInfo');
      } else if (index == '3') {
        this.$router.push('/vulEva');
      }
    },
    initPage(){
      this.getVulnerabilityList();
    },
  },
  mounted() {
    this.initPage();
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