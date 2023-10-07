<template>
  <div>
    <h1>Rock-Paper-Scissors Game</h1>
    <div>
      <button @click="registerPlayer">Register as Player</button>
      <p v-if="!isRegistered">Not registered as a player</p>
      <p v-else>Registered as Player {{ playerId }}</p>
    </div>
    <div v-if="isRegistered">
      <div>
        <label for="move">Select your move:</label>
        <select id="move" v-model="selectedMove">
          <option value="Rock">Rock</option>
          <option value="Paper">Paper</option>
          <option value="Scissors">Scissors</option>
        </select>
      </div>
      <div>
        <label for="password">Enter your password:</label>
        <input id="password" type="text" v-model="password" />
      </div>
      <button @click="generateExpectedData">Generate Expected Data</button>
      <button @click="playMove">Play Move</button>
      <button @click="revealMove">Reveal Move</button>
      <button @click="getOutcome">Get Outcome</button>
    </div>
    <div v-if="transactionHash">
      <p>Transaction Hash: {{ transactionHash }}</p>
    </div>
    <div v-if="winner">
      <p>Winner: {{ winner }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRegistered: false,
      playerId: 0,
      selectedMove: 'Rock',
      password: '',
      expectedData: '',
      transactionHash: '',
      winner: '',
    };
  },
  methods: {
  async registerPlayer() {
    try {
      // Реализуйте вызов /generate-expected-data на ваш сервер Node.js
      const response = await fetch('/generate-expected-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ move: this.selectedMove, password: this.password }),
      });

      if (response.ok) {
        const data = await response.json();
        this.playerId = data.playerId; // Обновите playerId на полученное значение
        this.isRegistered = true;
      } else {
        console.error('Failed to register player');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },
  async generateExpectedData() {
    try {
      // Реализуйте вызов /generate-expected-data на ваш сервер Node.js
      const response = await fetch('/generate-expected-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ move: this.selectedMove, password: this.password }),
      });

      if (response.ok) {
        const data = await response.json();
        this.expectedData = data.expectedData;
      } else {
        console.error('Failed to generate expected data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },
  async playMove() {
    try {
      // Реализуйте вызов /play-move на ваш сервер Node.js
      const response = await fetch('/play-move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ move: this.selectedMove, password: this.password }),
      });

      if (response.ok) {
        const data = await response.json();
        this.transactionHash = data.transactionHash;
      } else {
        console.error('Failed to play move');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },
  async revealMove() {
    try {
      // Реализуйте вызов /reveal-move на ваш сервер Node.js
      const response = await fetch('/reveal-move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ move: this.selectedMove, password: this.password }),
      });

      if (response.ok) {
        const data = await response.json();
        this.transactionHash = data.transactionHash;
      } else {
        console.error('Failed to reveal move');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },
  async getOutcome() {
    try {
      // Реализуйте вызов /get-outcome на ваш сервер Node.js
      const response = await fetch('/get-outcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();
        this.winner = data.winner;
      } else {
        console.error('Failed to get outcome');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },
},

};
</script>

<style>
/* Добавьте стили по вашему усмотрению */
</style>
