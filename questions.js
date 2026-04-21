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
    title: "Apical 4-Chamber View",
    questions: [
      {
        id: "q1",
        question: "Click on the Left Ventricle (LV)",
        image: "images/echo_ps4c.png",
        overlay: null,
        target: { x: 0.63, y: 0.37, radius: 0.13 },
        explanation: "The Left Ventricle (LV) is the dominant chamber on the right side of the A4C view. It has thicker walls than the RV and is responsible for systemic circulation."
      },
      {
        id: "q2",
        question: "Click on the Right Ventricle (RV)",
        image: "images/echo_ps4c.png",
        overlay: null,
        target: { x: 0.35, y: 0.37, radius: 0.13 },
        explanation: "The Right Ventricle (RV) is the anterior chamber on the left side of the A4C view. It normally has a crescent shape and thinner walls than the LV."
      },
      {
        id: "q3",
        question: "Click on the Interventricular Septum (IS)",
        image: "images/echo_ps4c.png",
        overlay: null,
        target: { x: 0.50, y: 0.32, radius: 0.08 },
        explanation: "The Interventricular Septum (IS) is the muscular wall between the RV and LV. It appears as a bright echogenic line in the center of the A4C view."
      },
      {
        id: "q4",
        question: "Click on the Left Atrium (LA)",
        image: "images/echo_ps4c.png",
        overlay: null,
        target: { x: 0.64, y: 0.67, radius: 0.11 },
        explanation: "The Left Atrium (LA) is the posterior-inferior chamber on the right side of the A4C view. It receives oxygenated blood from the pulmonary veins."
      },
      {
        id: "q5",
        question: "Click on the Right Atrium (RA)",
        image: "images/echo_ps4c.png",
        overlay: null,
        target: { x: 0.33, y: 0.67, radius: 0.11 },
        explanation: "The Right Atrium (RA) is the posterior-inferior chamber on the left side of the A4C view. It receives deoxygenated blood from the superior and inferior vena cava."
      },
      {
        id: "q6",
        question: "Click on the Mitral Valve (MV)",
        image: "images/echo_ps4c.png",
        overlay: null,
        target: { x: 0.59, y: 0.54, radius: 0.09 },
        explanation: "The Mitral Valve (MV) is a bicuspid valve located between the LA and LV. Its leaflets are visible in the A4C view opening and closing with each cardiac cycle."
      },
      {
        id: "q7",
        question: "Click on the Tricuspid Valve (TV)",
        image: "images/echo_ps4c.png",
        overlay: null,
        target: { x: 0.40, y: 0.54, radius: 0.09 },
        explanation: "The Tricuspid Valve (TV) separates the RA from the RV. It has three leaflets and is located slightly more apical than the mitral valve in the A4C view."
      },
    ]
  }
];
