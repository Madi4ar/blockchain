const express = require('express');
const app = express();
const path = require('path');
const crypto = require('crypto');
const Web3 = require('web3');
const jsonABI = require('../vuecontract/src/utils/abi.json')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Инфура проект ID и адрес смарт-контракта
const INFURA_PROJECT_ID = 'bc412cbfe3834dcf9f841e556d655f99';
const CONTRACT_ADDRESS = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8';

// Подключение к Ethereum сети через Infura
const web3 = new Web3(`https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`);

// Аби смарт-контракта (замените на ваш ABI)
const contractAbi = JSON.parse(jsonABI);

// Адрес вашего кошелька с Ether для отправки транзакций
const YOUR_WALLET_ADDRESS = '0xf4cB0A055499aFF0DAF3348854Ab63f4cb09C767';

// Создание объекта смарт-контракта
const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);

// Генерация ожидаемых данных на основе выбора игрока и пароля
function generateExpectedData(move, password) {
  const data = move + password;
  const expectedData = crypto.createHash('sha256').update(data).digest('hex');
  return expectedData;
}

// Обработчик POST-запроса для генерации ожидаемых данных
app.post('/generate-expected-data', async (req, res) => {
  const { move, password } = req.body;
  const expectedData = generateExpectedData(move, password);
  res.json({ expectedData });
});

// Обработчик POST-запроса для вызова функции play на смарт-контракте
app.post('/play-move', async (req, res) => {
  const { move, password } = req.body;
  const expectedData = await generateExpectedData(move, password);

  // Отправка транзакции для вызова функции play смарт-контракта
  try {
    const gas = await contract.methods.play(expectedData).estimateGas({ from: YOUR_WALLET_ADDRESS });
    const tx = await contract.methods.play(expectedData).send({ from: YOUR_WALLET_ADDRESS, gas });
    res.json({ transactionHash: tx.transactionHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to play move' });
  }
});

// Добавьте маршрут для раскрытия хода игрока
app.post('/reveal-move', async (req, res) => {
  const { move, password } = req.body;
  const expectedData = await generateExpectedData(move, password);

  try {
    // Отправка транзакции для вызова функции reveal смарт-контракта
    const gas = await contract.methods.reveal(expectedData).estimateGas({ from: YOUR_WALLET_ADDRESS });
    const tx = await contract.methods.reveal(expectedData).send({ from: YOUR_WALLET_ADDRESS, gas });
    res.json({ transactionHash: tx.transactionHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reveal move' });
  }
});

// Добавьте маршрут для получения результата и победителя
app.post('/get-outcome', async (req, res) => {
  try {
    // Вызов функции getOutcome() на вашем смарт-контракте
    const winner = await contract.methods.getOutcome().call({ from: YOUR_WALLET_ADDRESS });
    res.json({ winner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get outcome' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
