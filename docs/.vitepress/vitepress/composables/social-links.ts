import GitHubIcon from '../components/icons/github.vue'
import GiteeIcon from '../components/icons/gitee.vue'

export const useSocialLinks = () => {
  return [
    {
      link: "https://github.com/qianxunyimeng/meng-ui-vue",
      icon: GitHubIcon,
      text: "GitHub",
    },
    {
      link: "https://gitee.com/sql123z/meng-ui-vue",
      icon: GiteeIcon,
      text: "Gitee",
    },
  ];
}
