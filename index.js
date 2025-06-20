const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const app = express();
app.use(bodyParser.json());

app.post("/generate", (req, res) => {
  const prompt = req.body.prompt;

  // [暫時模擬]：實際上可以改成呼叫 MCP / GPT 指令
  const command = `echo "${prompt}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`錯誤：${error.message}`);
      return res.status(500).send("生成失敗");
    }

    res.json({ message: "已接收到 prompt：" + prompt, 回應: stdout.trim() });
  });
});

app.listen(3001, () => {
  console.log("🚀 Motiff Proxy Server 啟動在 http://localhost:3001");
});
