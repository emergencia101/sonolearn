// =============================================================
//  BANCO DE QUESTÕES — edite aqui para adicionar seus quizzes
// =============================================================
//
//  Cada questão tem:
//    title       : nome do quiz
//    question    : instrução para o usuário
//    image       : caminho da imagem de ultrassom (pasta images/)
//    overlay     : imagem com labels anatômicos (pasta images/)
//                  (pode ser null se não tiver ainda)
//    target      : estrutura que o usuário deve clicar
//      x, y      : posição em FRAÇÃO da imagem (0.0 a 1.0)
//                  ex: x:0.5, y:0.5 = centro exato da imagem
//      radius    : tolerância do clique (0.08 = 8% da largura)
//
// =============================================================

const QUIZZES = [
  {
    id: "a4c-1",
    title: "Janela Apical 4 Câmaras (A4C)",
    questions: [
      {
        id: "q1",
        question: "Clique no Ventrículo Esquerdo (LV)",
        image: "images/echo_ps4c.png",
        overlay: null,
        target: { x: 0.63, y: 0.37, radius: 0.13 },
        explanation: "O Ventrículo Esquerdo (VE / LV) é a câmara dominante no lado direito da janela A4C. Possui paredes mais espessas que o VD e é responsável pela circulação sistêmica."
      },
      {
        id: "q2",
        question: "Clique no Ventrículo Direito (RV)",
        image: "images/echo_ps4c.png",
        overlay: null,
        target: { x: 0.35, y: 0.37, radius: 0.13 },
        explanation: "O Ventrículo Direito (VD / RV) é a câmara anterior no lado esquerdo da janela A4C. Normalmente tem formato de crescente e paredes mais finas que o VE."
      },
      {
        id: "q3",
        question: "Clique no Septo Interventricular (IS)",
        image: "images/echo_ps4c.png",
        overlay: null,
        target: { x: 0.50, y: 0.32, radius: 0.08 },
        explanation: "O Septo Interventricular (SIV / IS) é a parede muscular entre o VD e o VE. Aparece como uma linha ecogênica brilhante no centro da janela A4C."
      },
      {
        id: "q4",
        question: "Clique no Átrio Esquerdo (LA)",
        image: "images/echo_ps4c.png",
        overlay: null,
        target: { x: 0.64, y: 0.67, radius: 0.11 },
        explanation: "O Átrio Esquerdo (AE / LA) é a câmara póstero-inferior no lado direito da janela A4C. Recebe sangue oxigenado das veias pulmonares."
      },
      {
        id: "q5",
        question: "Clique no Átrio Direito (RA)",
        image: "images/echo_ps4c.png",
        overlay: null,
        target: { x: 0.33, y: 0.67, radius: 0.11 },
        explanation: "O Átrio Direito (AD / RA) é a câmara póstero-inferior no lado esquerdo da janela A4C. Recebe sangue desoxigenado das veias cavas superior e inferior."
      },
      {
        id: "q6",
        question: "Clique na Valva Mitral (MV)",
        image: "images/echo_ps4c.png",
        overlay: null,
        target: { x: 0.59, y: 0.54, radius: 0.09 },
        explanation: "A Valva Mitral (VM / MV) é uma valva bicúspide localizada entre o AE e o VE. Seus folhetos são visíveis na janela A4C abrindo e fechando a cada ciclo cardíaco."
      },
      {
        id: "q7",
        question: "Clique na Valva Tricúspide (TV)",
        image: "images/echo_ps4c.png",
        overlay: null,
        target: { x: 0.40, y: 0.54, radius: 0.09 },
        explanation: "A Valva Tricúspide (VT / TV) separa o AD do VD. Possui três folhetos e está localizada ligeiramente mais apical que a valva mitral na janela A4C."
      },
    ]
  }
];
