# LlamaIndex / SDK

LlamaIndex 是用于构建 RAG、知识库和智能体应用的开发框架，不是普通聊天软件。它通常通过 OpenAI 兼容接口或 SDK 配置接入 DouDi。

## 下载地址

- 官方文档：[https://developers.llamaindex.ai](https://developers.llamaindex.ai)
- 官方 GitHub：[https://github.com/run-llama/llama_index](https://github.com/run-llama/llama_index)
- 新手建议：如果你只是想聊天，不需要 LlamaIndex；它更适合开发者做知识库应用。

## 接入思路

| 配置项 | 填写内容 |
| --- | --- |
| API Key | DouDi Key |
| Base URL | `https://doudi.ai/v1` |
| Model | DouDi 控制台里的完整模型名 |

## 使用建议

1. 先用 OpenAI Compatible 的 curl 测试接口。
2. 再在 LlamaIndex 中配置 OpenAI 兼容模型。
3. 小数据集跑通后，再接入正式知识库。
4. 记录每次检索和生成的消耗，避免长文档反复测试。

## 注意

不同 LlamaIndex 版本的参数名可能不同。看到 `api_base`、`base_url`、`api_key`、`model` 这些字段时，按上表填写即可。
