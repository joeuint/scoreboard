<script lang="ts">
  import { get } from "svelte/store";
  import { score1, score2 } from "./stores/scores";
  import { timer, pause, totalSeconds } from "./stores/timer";

  function increment(id: number) {
    if (id === 1) {
      score1.update((n) => n + 1);
    } else if (id === 2) {
      score2.update((n) => n + 1);
    }
  }

  function decrement(id: number) {
    if (id === 1) {
      score1.update((n) => n - 1);
    } else if (id === 2) {
      score2.update((n) => n - 1);
    }
  }

  function pauseSet() {
    pause.set(true);
  }

  function pauseUnset() {
    pause.set(false);
  }

  let seconds;

  function setTime() {
    totalSeconds.set(seconds);
    timer.set(`${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`);

    function pad(val) {
      let valString = val + "";

      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    }
  }

  function resetTimer() {
    pauseSet();
    totalSeconds.set(0);
    timer.set("00:00");
  }
</script>

<div class="control-panel">
  <div class="teams">
    <div class="team" id="team1">
      <h1>Team 1</h1>
      <div class="buttons">
        <button on:click={() => increment(1)}>+1</button>
        <button on:click={() => decrement(1)}>-1</button>
      </div>
    </div>
    <div class="team" id="timer">
      <h1>Timer</h1>
      <div class="buttons">
        <button on:click={pauseUnset}>Start</button>
        <button on:click={pauseSet}>Stop</button>
        <button on:click={resetTimer}>Reset</button>
      </div>
      <input type="number" name="seconds" bind:value={seconds} />
      <button on:click={setTime}>Set Seconds</button>
    </div>
    <div class="team" id="team2">
      <h1>Team 2</h1>
      <div class="buttons">
        <button on:click={() => increment(2)}>+1</button>
        <button on:click={() => decrement(2)}>-1</button>
      </div>
    </div>
  </div>
</div>

<style scoped>
  .control-panel {
    display: flex;
    height: 40vh;
    align-items: end;
  }

  .teams {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .team {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    font-size: 2em;
    border-radius: 0.5rem;
    border: 0;
    background-color: purple;
    color: white;
    padding: 1rem 2rem;
    margin: 1rem;
  }
</style>
