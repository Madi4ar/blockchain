import jsonData from './utils/abi.json'

const contract = new web3.eth.Contract(
	JSON.parse(jsonData),
	'0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8'
)

// Выбор игрока (например, Rock)
const playerChoice = 0 // Здесь 0 представляет собой значение Rock

// Определение суммы ставки в wei (0.0001 ETH)
const betAmount = web3.utils.toWei('0.0001', 'ether')

// Оплатить игру, вызвав функцию play()
contract.methods
	.play(playerChoice)
	.send({ from: yourWalletAddress, value: betAmount })
	.on('transactionHash', hash => {
		// Транзакция отправлена, можно отслеживать статус транзакции по хэшу
		console.log(`Transaction hash: ${hash}`)
	})
	.on('receipt', receipt => {
		// Транзакция успешно выполнена, игра может быть записана
		console.log(`Transaction receipt:`, receipt)
	})
	.on('error', error => {
		// Обработка ошибки, если транзакция не выполнена
		console.error(`Transaction error:`, error)
	})
