const dropList = document.querySelectorAll('form select');
const fromEl = document.getElementById('from');
const toEl = document.getElementById('to');
const exchangeCurrenct = document.querySelector('.icon');
const convertBtn = document.getElementById('submit');
// const fromEl = document.querySelector('.from select');
// const toEl = document.querySelector('.to select');

convertBtn.addEventListener('click', (el) => {
	el.preventDefault;

	convertCurrency();
});

for (let i = 0; i < dropList.length; i++) {
	for (currency_code in country_list) {
		let selected;
		if (i == 0) {
			selected = currency_code == 'USD' ? 'selected' : '';
		} else if (i == 1) {
			selected = currency_code == 'MYR' ? 'selected' : '';
		}

		let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
		dropList[i].insertAdjacentHTML('beforeend', optionTag);
	}
	dropList[i].addEventListener('change', (e) => {
		console.log(e.target);
		changeFlag(e.target);
	});
}

exchangeCurrenct.addEventListener('click', () => {
	let temp = fromEl.value;
	fromEl.value = toEl.value;
	toEl.value = temp;

	changeFlag(fromEl);
	changeFlag(toEl);

	convertCurrency();
});

function changeFlag(input) {
	for (let code in country_list) {
		if (code == input.value) {
			let swapFlag = input.parentElement.querySelector('img');
			swapFlag.src = `https://www.countryflags.io/${country_list[code]}/flat/48.png`;
		}
	}
}

function convertCurrency() {
	const amount = document.getElementById('amount');
	let currentValue = amount.value;
	const exchangeRateTxt = document.getElementById('text');

	//if input value is empty or zero, the value will become default 1
	if (currentValue == '' || currentValue == 0) {
		amount.value = 1;
		currentValue = 1;
	}

	exchangeRateTxt.innerText = 'Getting exchange rate...';
	let url = `https://v6.exchangerate-api.com/v6/36156507820514aed631ddb6/latest/${fromEl.value}`;
	fetch(url)
		.then((response) => response.json())
		.then((result) => {
			const exchangeRates = result.conversion_rates[toEl.value];
			const finalRates = (exchangeRates * currentValue).toFixed(2);
			exchangeRateTxt.innerText = `${currentValue} ${fromEl.value} = ${finalRates} ${toEl.value}`;
		})
		.catch(() => {
			exchangeRateTxt.innerText = 'Something went wrong';
		});
}

// convertBtn.addEventListener('click', (e) => {
// 	e.preventDefault;

// 	convertCurrency();
// });

// for (let i = 0; i < dropList.length; i++) {
// 	for (let currency_code in country_list) {
// 		let selected;
// 		if (i == 0) {
// 			selected = currency_code == 'USD' ? 'selected' : '';
// 		} else if (i == 1) {
// 			selected = currency_code == 'MYR' ? 'selected' : '';
// 		}
// 		let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
// 		dropList[i].insertAdjacentHTML('beforeend', optionTag);
// 	}
// 	dropList[i].addEventListener('change', (e) => {
// 		// console.log(e.target);
// 		changeFlag(e.target);
// 	});
// }

// exchangeCurrenct.addEventListener('click', () => {
// 	let temp = fromEl.value;
// 	fromEl.value = toEl.value;
// 	toEl.value = temp;
// 	changeFlag(fromEl);
// 	changeFlag(toEl);
// 	convertCurrency();
// });

// function changeFlag(element) {
// 	for (let code in country_list) {
// 		if (code == element.value) {
// 			let imgTag = element.parentElement.querySelector('img');
// 			imgTag.src = `https://www.countryflags.io/${country_list[code]}/flat/48.png`;
// 		}
// 	}
// }

// function convertCurrency() {
// 	const amount = document.getElementById('amount');
// 	let inputValue = amount.value;
// 	const exchangeRateTxt = document.getElementById('text');

// 	//if user dont input any value or blank then the value will become default 1
// 	if (inputValue == '' || inputValue == 0) {
// 		inputEl.value = '1';
// 		inputValue = 1;
// 	}
// 	exchangeRateTxt.innerText = 'Getting exchange rate...';
// 	let url = `https://v6.exchangerate-api.com/v6/36156507820514aed631ddb6/latest/${fromEl.value}`;
// 	fetch(url)
// 		.then((response) => response.json())
// 		.then((result) => {
// 			let exchangeRate = result.conversion_rates[toEl.value];
// 			let totalExRate = (inputValue * exchangeRate).toFixed(2);
// 			exchangeRateTxt.innerText = `${inputValue} ${fromEl.value} = ${totalExRate} ${toEl.value}`;
// 		})
// 		.catch(() => {
// 			exchangeRateTxt.innerText = 'Something went wrong';
// 		});
// }
