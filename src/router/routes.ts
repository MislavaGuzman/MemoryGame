import { RouteRecordRaw } from 'vue-router';
import Navigation from '../components/MemoryNavigation.vue';
import GameBoard from '../components/GameBoard.vue';
import ResultScreen from '../components/ResultScreen.vue';


const routes: RouteRecordRaw[] = [
  { path: '/', component: Navigation },
  { path: '/game', component: GameBoard },
  { path: '/result', component: ResultScreen },
];

export default routes;
