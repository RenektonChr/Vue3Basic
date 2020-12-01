<template>
  <img src="./assets/logo.png" alt="Vue Logo" />
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <button @click="addCount">count ++</button>
  <ul>
    <li v-for="(number, index) in numbers" :key="index">
      <h1>{{ number }}</h1>
    </li>
  </ul>
  <modal />
  <h1>{{ person.name }}</h1>
  <h1>{{ greetings }}</h1>
  <h1 v-if="loading">Loading...</h1>
  <img v-if="loaded" :src="result[0].url" alt="">
  <h1>X: {{ x }}, Y: {{ y }}</h1>
  <button @click="updateGreeting">updateGreeting</button>
</template>

<script lang="ts">
import { computed, reactive, toRefs, onUpdated, ref, watch } from "vue";
import useMousePosition from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'
import modal from './components/modal.vue'

interface DataProps {
  count: number;
  double: number;
  addCount: () => void;
  numbers: number[];
  person: { name?: string };
}
interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default {
  name: "App",
  components: {
    modal
  },
  setup() {
    
    onUpdated(() => {
      console.log('onUpdated');
    })
    
    const data: DataProps = reactive({
      count: 0,
      addCount: () => {
        data.count++;
      },
      double: computed(() => data.count * 2),
      numbers: [0 , 1, 2],
      person: {}
    });

    const { x, y } = useMousePosition()

    const greetings = ref("")
    const updateGreeting = () => {
      greetings.value += 'Hello'
    }
    const { result, loading, loaded, error } = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')
    watch(result, () => {
      if(result.value) {
        console.log('value', result.value[0].url);
      }
    })
    
    watch([greetings, () => data.count], (newVal, oldVal) => {
      console.log('newVal---->', newVal);
      console.log('oldVal---->', oldVal);
      
      document.title = "updated" + greetings.value + data.count
    })
    
    const refData = toRefs(data)
    const modalOpen = ref(false)
    const openModal = () => {
      modalOpen.value = true
    }
    
    data.numbers[1] = 999
    data.numbers.push(3)
    data.numbers.push(666)
    data.person.name = "renekton"

    return {
      ...refData,
      greetings,
      updateGreeting,
      x,
      y,
      result, 
      loading, 
      loaded, 
      error,
      modalOpen
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
