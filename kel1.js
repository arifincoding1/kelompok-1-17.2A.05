let n = 0;
let graph = [];
let nodes = [];
let edges = [];
let network;

let music = document.getElementById("bgm");

/* ===================== */
/* 🎵 SISTEM MUSIK */
/* ===================== */
function playMusic(src) {
  music.pause();
  music.src = src;
  music.load();
  music.volume = 0.5;
  music.play();
}

/* OPENING MUSIC */
window.onload = function() {
  playMusic("Know Me To well.mp3"); // 🔥 GANTI FILE DISINI
};

/* START APP */
function startApp() {
  document.getElementById("opening").style.display = "none";
  document.getElementById("app").style.display = "block";

  playMusic("di saat sendiri.mp3"); // 🔥 GANTI FILE DISINI
}

/* ===================== */
/* GRAPH */
/* ===================== */
function initGraph() {
  n = parseInt(document.getElementById("nodes").value);

  graph = Array.from({ length: n }, () => Array(n).fill(0));

  nodes = [];
  edges = [];

  for (let i = 0; i < n; i++) {
    nodes.push({ id: i, label: "Node " + i });
  }

  drawGraph();
  showMatrix();
}

function addEdge() {
  let from = parseInt(document.getElementById("from").value);
  let to = parseInt(document.getElementById("to").value);
  let w = parseInt(document.getElementById("weight").value);

  graph[from][to] = w;
  graph[to][from] = w;

  edges.push({ from: from, to: to, label: w.toString() });

  drawGraph();
  showMatrix();
}

function drawGraph() {
  let container = document.getElementById("network");

  let data = {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges),
  };

  network = new vis.Network(container, data, {});
}

function showMatrix() {
  let html = "<table border='1'>";
  for (let i = 0; i < n; i++) {
    html += "<tr>";
    for (let j = 0; j < n; j++) {
      html += "<td>" + graph[i][j] + "</td>";
    }
    html += "</tr>";
  }
  html += "</table>";

  document.getElementById("matrix").innerHTML = html;
}

/* ===================== */
/* ALGORITMA */
/* ===================== */

/* BFS */
function bfs() {
  playMusic("Tanpa tergesa.mp3"); // 🔥 GANTI FILE DISINI

  let visited = Array(n).fill(false);
  let queue = [0];
  visited[0] = true;

  let hasil = [];

  while (queue.length) {
    let node = queue.shift();
    hasil.push(node);

    for (let i = 0; i < n; i++) {
      if (graph[node][i] > 0 && !visited[i]) {
        visited[i] = true;
        queue.push(i);
      }
    }
  }

  alert("BFS: " + hasil.join(" -> "));
}

/* DFS */
function dfs() {
  playMusic("paradise.mp3"); // 🔥 GANTI FILE DISINI

  let visited = Array(n).fill(false);
  let hasil = [];

  function dfsUtil(v) {
    visited[v] = true;
    hasil.push(v);

    for (let i = 0; i < n; i++) {
      if (graph[v][i] > 0 && !visited[i]) {
        dfsUtil(i);
      }
    }
  }

  dfsUtil(0);

  alert("DFS: " + hasil.join(" -> "));
}

/* MST */
function mst() {
  playMusic("aku,kamu,dan samudera.mp3"); // 🔥 GANTI FILE DISINI

  let selected = Array(n).fill(false);
  selected[0] = true;

  let result = [];

  for (let k = 0; k < n - 1; k++) {
    let min = Infinity;
    let x = 0, y = 0;

    for (let i = 0; i < n; i++) {
      if (selected[i]) {
        for (let j = 0; j < n; j++) {
          if (!selected[j] && graph[i][j] > 0) {
            if (graph[i][j] < min) {
              min = graph[i][j];
              x = i;
              y = j;
            }
          }
        }
      }
    }

    result.push(`${x} - ${y} (${min})`);
    selected[y] = true;
  }

  alert("MST:\n" + result.join("\n"));
}