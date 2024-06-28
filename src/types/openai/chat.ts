import { LLMRoleType } from '@/types/llm';
import { OpenAIFunctionCall } from '@/types/openai/functionCall';

interface UserMessageContentPartText {
  text: string;
  type: 'text';
}

interface UserMessageContentPartImage {
  image_url: {
    detail?: 'auto' | 'low' | 'high';
    url: string;
  };
  type: 'image_url';
}

export type UserMessageContentPart = UserMessageContentPartText | UserMessageContentPartImage;

export interface OpenAIChatMessage {
  /**
   * @title 内容
   * @description 消息内容
   */
  content: string | UserMessageContentPart[];
  function_call?: OpenAIFunctionCall;

  name?: string;
  /**
   * 角色
   * @description 消息发送者的角色
   */
  role: LLMRoleType;
}

/**
 * @title Role Stream Payload
 */
export interface ChatStreamPayload {
  /**
   * @title 控制生成文本中的惩罚系数，用于减少重复性
   * @default 0
   */
  frequency_penalty?: number;
  /**
   * @title 生成文本的最大长度
   */
  max_tokens?: number;
  /**
   * @title 聊天信息列表
   */
  messages: OpenAIChatMessage[];
  /**
   * @title 模型名称
   */
  model: string;
  /**
   * @title 返回的文本数量
   */
  n?: number;
  /**
   * 开启的插件列表
   */
  plugins?: string[];
  /**
   * @title 控制生成文本中的惩罚系数，用于减少主题的变化
   * @default 0
   */
  presence_penalty?: number;
  /**
   * @title 是否开启流式请求
   * @default true
   */
  stream?: boolean;
  /**
   * @title 生成文本的随机度量，用于控制文本的创造性和多样性
   * @default 1
   */
  temperature: number;
  /**
   * @title 在生成文本等任务中，选择可能性最高的前 P 个词的概率累加和
   * @default 1
   */
  top_p?: number;
}
