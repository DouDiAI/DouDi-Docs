# LangChain / SDK

自写代码、LangChain、OpenAI SDK 一般都可以通过自定义 Base URL 接入 DouDi。

## OpenAI SDK 示例

```js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DOUDI_API_KEY,
  baseURL: "https://doudi.ai/v1",
});

const completion = await client.chat.completions.create({
  model: "<MODEL_ID>",
  messages: [{ role: "user", content: "写一句测试回复" }],
});

console.log(completion.choices[0]?.message?.content);
```

## LangChain 示例

```js
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  apiKey: process.env.DOUDI_API_KEY,
  model: "<MODEL_ID>",
  configuration: {
    baseURL: "https://doudi.ai/v1",
  },
});

const result = await model.invoke("用一句话介绍 DouDi");
console.log(result.content);
```

## 开发建议

- Key 放环境变量，不写进代码。
- 请求失败要记录状态码和响应体。
- 批量任务加入并发限制和重试退避。
- 对长任务设置超时，避免脚本挂住持续等待。

