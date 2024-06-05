const urlcursos = 'http://localhost:3000/cursos'
let cursos = []

function carregaDadosJSONServer (func) {
    fetch(urlcursos)
    .then (function (response) { return response.json() })
    .then (function (dados) {
        cursos = dados
        func ()
    })
}

function carregadados(){
    let tela = document.getElementById('tela');
    strTextoHTML = '';
    for (let i = 0; i < cursos.length; i++) {
        let curso = cursos[i];
        let quizesFacil = curso.facil.quizes_id.map(quiz => quiz).join(`<br> quiz: `);
        let contFacil = curso.facil.conteudos_id.map(conteudo => conteudo).join(`<br> conteúdo: `);

        let quizesMedio = curso.medio.quizes_id.map(quiz => quiz).join(`<br> quiz: `);
        let contMedio = curso.medio.conteudos_id.map(conteudo => conteudo).join(`<br> conteúdo: `);

        let quizesDificil = curso.dificil.quizes_id.map(quiz => quiz).join(`<br> quiz: `);
        let contDificil = curso.dificil.conteudos_id.map(conteudo => conteudo).join(`<br> conteúdo: `);
        strTextoHTML += 
        `
        <div id="curso_${curso.id}:" class="py-3">
        <h2> id: ${curso.id} <br>curso: ${curso.titulo}</h2>
    <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed text-white buttonF" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne${curso.id}" aria-expanded="false" aria-controls="flush-collapseOne${curso.id}">
              Fácil
            </button>
          </h2>
          <div id="flush-collapseOne${curso.id}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body"><strong>quizes:</strong> <br>quiz: ${quizesFacil} <br><strong>conteúdos:</strong> <br>conteúdo: ${contFacil}</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed text-white buttonM" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo${curso.id}" aria-expanded="false" aria-controls="flush-collapseTwo${curso.id}">
              Médio
            </button>
          </h2>
          <div id="flush-collapseTwo${curso.id}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body"><strong>quizes:</strong> <br>quiz: ${quizesMedio} <br><strong>conteúdos:</strong> <br>conteúdo: ${contMedio}</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed text-white buttonD" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree${curso.id}" aria-expanded="false" aria-controls="collapseThree${curso.id}">
                Difícil
            </button>
          </h2>
          <div id="collapseThree${curso.id}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body"><strong>quizes:</strong> <br>quiz: ${quizesDificil} <br><strong>conteúdos:</strong> <br>conteúdo: ${contDificil}</div>
          </div>
        </div>
      </div>
    </div>
        `
    }

    tela.innerHTML = strTextoHTML;
}
carregaDadosJSONServer (carregadados)



document.getElementById('BtnConfCurso').addEventListener('click', function() {
  let novoId = cursos.length + 1;
  let novoTitulo = document.getElementById('InputTitulo').value;

  // Criação das arrays
  let novoQuizF = document.getElementById('InputQuizF').value.split(',').map(Number);
  let novoConteudoF = document.getElementById('InputContF').value.split(',').map(Number);
  let novoQuizM = document.getElementById('InputQuizM').value.split(',').map(Number);
  let novoConteudoM = document.getElementById('InputContM').value.split(',').map(Number);
  let novoQuizD = document.getElementById('InputQuizD').value.split(',').map(Number);
  let novoConteudoD = document.getElementById('InputContD').value.split(',').map(Number);

  let novoCursoObj = {
    id: novoId,
    titulo: novoTitulo,
    facil: {
      quizes_id: novoQuizF,
      conteudos_id: novoConteudoF
    },
    medio: {
      quizes_id: novoQuizM,
      conteudos_id: novoConteudoM
    },
    dificil: {
      quizes_id: novoQuizD,
      conteudos_id: novoConteudoD
    }
  };

  fetch(urlcursos, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoCursoObj),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Curso adicionado:', data);
      jogos.push(data);
      carregaDados();
  })
  .catch((error) => {
      console.error('Erro:', error);
  });
});