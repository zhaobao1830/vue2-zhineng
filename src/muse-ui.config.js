// 单组件加载

// 加载基础样式
import 'muse-components/styles/base.less'
import appBar from 'muse-components/appBar'
import avatar from 'muse-components/avatar'
import iconButton from 'muse-components/iconButton'
import * as list from 'muse-components/list'
import textField from 'muse-components/textField'
// 这个模块在项目官网上并没有看到，但是看到作者在issues上回答时说是高分辨率屏的处理，于是就试着加进去了
import {retina} from 'muse-components/utils'

const components = {
  appBar,
  avatar,
  iconButton,
  ...list,
  textField,
}

export default {
  install (Vue) {
    Object.keys(components).forEach((key) => {
      Vue.component(components[key].name, components[key])
    })
    retina()
  }
}
