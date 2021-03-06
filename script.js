/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
   const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 7;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;

const categorias = {
    frutas: ["banana", "maça", "laranja", "mamao", "morango", "uva", "abacaxi", "limao", "kiwi", "abacate", "açai", "acerola", "amora", "caqui", "carambola", "cereja", "coco", "cupuaçu", "figo", "Framboesa", "goiaba", "groselha", "jabuticaba", "Jaca", "jambo", "manga", "maracuja", "melancia", "melao", "pera", "pessego", "pitanga", "pitaya", "tangerina", ],

    profissoes: ["engenheiro", "programador", "professor", "advogado", "pedreiro", "vendedor", "analista", "caixa", "açogueiro", "acrobata", "acupuntor", "administrador", "aeromoça", "agente", "policial", "agricultor", "ajudante", "alfaiate", "almoxarife", "ambulante", "anestesista", "arquiteto", "artesao", "artista", "acessor", "assistente", "atacadista", "atleta", "ator", "balconista", "barman", "biologista", "biologo", "bombeiro", "borracheiro", "cabeleleiro", "camareira", "caminhoneiro", "capataz", "carpinteiro", "carteiro", "ceramista", "chapeiro", "chaveiro", "chofer", "cirurgiao", "consultor", "coordenador", "corretor", "coveiro", "cozinheiro", "delegado", "dentista", "desenhista", "diretor", "economista", "ecologista", "editor", "eletricista", "escritor", "floricutor", "fotografo", "gerente", "historiador", "humorista", "ilusionista", "inspetor", "instrutor", "interprete", "joalheiro", "jornalista", "juiz", "lavador", "lavoureiro", "legista", "letrista", "lixeiro", "luthier", "maestro", "musico", "manobrista", "maquiador", "mecanico", "marceneiro", "massagista", "medico", "mensageiro", "mineirador", "modelo", "montador", "motorista", "narrador", "nutricionista", "odontologista", "operador", "orientador", "otorrino", "padeiro", "paraquedista", "pasteleiro", "pedicure", "pescador", "pesquisador", "piloto", "pintor", "poeta", "porteiro", "procurador", "produtor", "projetista", "psicologo", "psiquiatra", "quimico", "quiropraxista", "radialista", "recepcionista", "redator", "reporter", "supervisor", "treinador", "torneiro", "taxista", "teologo", "telefonista", "tecnico", "urologista", "veterinario", "vidraceiro", "vigia", "zelador"],

    animais: ["cachorro", "gato", "papagaio", "cavalo", "elefante", "galinha", "girafa", "cobra", "jacare"],

    cores: ["preto", "branco", "vermelho", "laranja", "verde", "azul", "marrom", "roxo", "amarelo", "magenta"], 

    carros: ["gol", "vectra", "fox", "onix", "uno", "palio", "corsa", "jeep", "polo", "prisma"],
    
};

function retornaArrayCategorias(){
    return Object.keys(categorias);
}

function retornaCategoria(){
    const arrayCategorias = retornaArrayCategorias();
    let indiceCategoria = Math.floor(Math.random() * arrayCategorias.length);
    return arrayCategorias[indiceCategoria];
}

function exibeCategoria(){
    categoria.innerHTML = retornaCategoria();
}

function retornaNumAleatorio(max){
    return Math.floor(Math.random() * max);
}

function definePalavraProposta(){
    const arrayPalavras = categorias[categoria.innerHTML];
    let indicePalavra = retornaNumAleatorio(arrayPalavras.length);
    palavraProposta = arrayPalavras[indicePalavra];
    ocultaPalavra();
}

function ocultaPalavra(){
    let palavraOcultada = "";
    for(let i = 0; i < palavraProposta.length; i++){
        palavraOcultada += "-";
    }
    exibePalavraInterface(palavraOcultada);
}

function exibePalavraInterface(palavra){
    palavraInterface.innerHTML = palavra;
}

function tentativa(letra){

    if(palavraProposta.includes(letra)){
        atualizaPalavraInterface(letra);
    }else{
        letrasErradasArray.push(letra);
        letrasErradas.innerHTML = "Letras erradas: " + letrasErradasArray;
        if(partesBoneco.length > indiceBoneco){
            desenhaBoneco();
        }

    }
    verificaFimDeJogo();
}

function verificaFimDeJogo(){
    if(!palavraInterface.innerHTML.includes("-")){
        exibePalavraInterface("Você venceu!!!");
        window.removeEventListener("keypress", retornaLetra);
    }else if(letrasErradasArray.length >= numTentativas){
        desenhaOlhos();
        exibePalavraInterface("Você perdeu!!!");
        window.removeEventListener("keypress", retornaLetra);
    }
}

function atualizaPalavraInterface(letra){
    let palavraAux = "";
    for(let i = 0; i < palavraProposta.length; i++){
        if(palavraProposta[i] === letra){
            palavraAux += letra;
        }else if(palavraInterface.innerHTML[i] != "-"){
            palavraAux += palavraInterface.innerHTML[i];
        }else{
            palavraAux += "-";
        }
    }
    exibePalavraInterface(palavraAux);
}

/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e){ 
    tentativa(e.key);
}

/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco(){
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos(){
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco(){
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo(){
    indiceBoneco = 0;
    letrasErradasArray = [];
    ocultaBoneco();
    exibeCategoria();
    definePalavraProposta();
    letrasErradas.innerHTML = "Letras erradas: ";
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);
