<script lang="ts">
  import { score1, score2 } from "./stores/scores";
  import { timer, pause, totalSeconds } from "./stores/timer";
  import { get } from "svelte/store";

  function tick() {
    if (!get(pause)) {
      totalSeconds.update((n) => n + 1);
      let total = get(totalSeconds);
      timer.set(`${pad(Math.floor(total / 60))}:${pad(total % 60)}`);
    }
  }

  function pad(val) {
    let valString = val + "";

    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  setInterval(tick, 1000);
</script>

<div class="scoreboard">
  <div class="teams">
    <div class="team" id="team1">
      <h1 class="name">Team 1</h1>
      <div class="score">{$score1}</div>
    </div>
    <div class="team" id="team2">
      <h1 class="name">Team 2</h1>
      <div class="score">{$score2}</div>
    </div>
  </div>
  <div class="timer">{$timer}</div>
</div>

<style scoped>
  .score {
    font-size: 3em;
  }

  .teams {
    display: flex;
    justify-content: space-between;
  }

  .team {
    margin: 0 5rem;
  }

  .team {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .scoreboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 60vh;
  }

  .timer {
    font-size: 3em;
    margin-top: 1rem;
    display: flex;
  }
</style>
