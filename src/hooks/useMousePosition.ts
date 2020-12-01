import { onMounted, onUnmounted, reactive, toRefs } from 'vue'

function useMousePosition() {
  // 接口
  interface PositionPoint {
    x: number;
    y: number;
    updateMouse: (e: MouseEvent) => void;
  }
  
  const pointData: PositionPoint = reactive({
    x: 0,
    y: 0,
    updateMouse: (e: MouseEvent) => {
      pointData.x = e.pageX
      pointData.y = e.pageY
    }
  })

  const refPointData = toRefs(pointData)

  onMounted(() => {
    // 添加事件
    document.addEventListener('click', pointData.updateMouse)
  });
  onUnmounted(() => {
    document.removeEventListener('click', pointData.updateMouse)
  })

  return { x: refPointData.x, y: refPointData.y }
}

export default useMousePosition