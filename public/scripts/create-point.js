

function populateUFs() {
	const ufSelect = document.querySelector("select[name=uf]")
	fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
	.then( res => res.json() ) // uma função anonima retornando um valor.
	.then( states => {

		for( const state of states ) {
			ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
		}

		
	} )
}

populateUFs()

function getCities(event) {
	const citySelect = document.querySelector("select[name=city]")
	const stateInput = document.querySelector("input[name=state]")

	const ufValue = event.target.value

	const indexOfSelectedState = event.target.selectedIndex
	stateInput.value = event.target.options[indexOfSelectedState].text

	
	const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

	// limpando o campo de cidades apos escolher um estado diferente
	citySelect.innerHTML = "<option value> Seleciona a Cidade </option"
	citySelect.disabled = true

	fetch(url)
	.then( res => res.json() ) // uma função anonima retornando um valor.
	.then( cities => {
		

		for( const city of cities ) {
			citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
		}

		citySelect.disabled = false
	} )
}

document
	.querySelector("select[name=uf]")
	.addEventListener("change", getCities)

// Itens de coleta
// pegar todos os li's
const intemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of intemsToCollect) {
	item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
	const itemLi = event.target

	// adicionar ou remover uma classe com Javascript
	itemLi.classList.toggle("selected")

	const itemId = itemLi.dataset.id

	//verificar se existem itens selecionados, se sim
	//pegas os itens selecionados
	const alreadySelected = selectedItems.findIndex( item => {
		const itemFound = item == itemId // isso será true ou false
		return itemFound
	})

	//se ja estiver selecionado, 
	if( alreadySelected >= 0 ) {
	// tirar da selecão
		const filteredItems = selectedItems.filter( item => {
			const itemIsDifferent = item != itemId
			return itemIsDifferent 
		})
		selectedItems = filteredItems
	} else {
	// se nao estiver selecionado, adicionar selecão
	// adicionar seleção
		selectedItems.push(itemId)
	}
	// atualizar o campo escondido com os itens selecionados
	collectedItems.value = selectedItems	
}
