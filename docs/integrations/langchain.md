# LangChain 配置

LangChain 是一个用于构建 AI 应用的开发框架，支持 Python 和 JavaScript。由于 DouDi.ai 完全兼容 OpenAI 协议，只需修改 `openai_api_base` 即可接入。

## 前提条件

*   已注册 DouDi.ai 账号并获取 API Key（[前往获取](https://doudi.ai/keys)  ）
*   已安装 Python 3.8+

## 配置步骤

### 第 1 步：安装依赖

```
pip3 install langchain langchain-openai
```

![安装 LangChain](/imported/haoai/integrations-langchain-01.webp)

### 第 2 步：配置并运行

### Python

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="openai/gpt-5.4-mini",
    api_key="YOUR_DOUDI_API_KEY",
    base_url="https://doudi.ai/v1",
)

response = llm.invoke("用一句话介绍 DouDi.ai Gateway")
print(response.content)
```

运行：

```
python3 -W ignore example.py
```

### JavaScript

```javascript
import { ChatOpenAI } from "@langchain/openai";

const llm = new ChatOpenAI({
  model: "openai/gpt-5.4-mini",
  apiKey: "YOUR_DOUDI_API_KEY",
  configuration: {
    baseURL: "https://doudi.ai/v1",
  },
});

const response = await llm.invoke("用一句话介绍 DouDi.ai Gateway");
console.log(response.content);
```

![运行效果](/imported/haoai/integrations-langchain-02.webp)

## 可用模型示例

推荐模型请参考 [DouDi.ai 模型广场/价格页面](https://doudi.ai/pricing)  。

## 常见问题

**Q: 提示 `ModuleNotFoundError: No module named 'langchain_openai'`**

运行 `pip3 install langchain-openai` 安装缺失的包。

**Q: 提示 API Key 无效**

确认 `openai_api_key` 填写的是 DouDi.ai 的 API Key，而不是 OpenAI 官方的 Key。
