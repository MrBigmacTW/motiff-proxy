const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    // Call Motiff API
    const response = await axios.post(
      "https://motiff-proxy.onrender.com/generate", // ⚠️ 替換成實際 API endpoint
      {
        prompt: prompt
      },
      {
        headers: {
          Authorization: "Bearer O06ECiUCosLqQeia47egS5lFhAxWaENF", // ⚠
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      message: "✅ 已成功產生圖像",
      prompt: prompt,
      result: response.data // 根據回傳格式調整，例如 { image_url: ... }
    });

  } catch (error) {
    console.error("❌ Motiff API 呼叫失敗：", error.response?.data || error.message);
    res.status(500).send("呼叫 Motiff API 失敗");
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🌈 Motiff Proxy Server 啟動在 http://localhost:${port}`);
});
