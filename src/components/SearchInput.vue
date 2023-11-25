vue
<template>
  <el-input
    v-model="keyword"
    placeholder="请输入关键词"
    @keydown.enter="search"
    clearable
  ></el-input>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const keyword = ref('');

    // 监听url query参数的变化
    watch(
      () => route.query.keyword,
      (value) => {
        keyword.value = value || '';
      }
    );

    // 初始化时将url query参数的值赋给keyword
    onMounted(() => {
      keyword.value = route.query.keyword || '';
    });

    // 搜索方法
    const search = () => {
      const query = { ...route.query };
      if (keyword.value) {
        query.keyword = keyword.value;
      } else {
        delete query.keyword;
      }
      router.push({ path: route.path, query });
    };

    return {
      keyword,
      search,
    };
  },
};
</script>