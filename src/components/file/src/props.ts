import { PropOptions } from 'compatible-vue';
import { UploadResult } from './types';
export const basicProps = {
  helpText: {
    type: String,
    default: '',
  } as PropOptions<string>,
  // 文件最大多少MB
  maxSize: {
    type: Number,
    default: 0,
  } as PropOptions<number>,
  maxNumber: {
    type: Number,
    default: 0,
  } as PropOptions<number>,
  accept: {
    type: Array,
    default: () => {
      return [];
    },
  } as PropOptions<string[]>,
  multiple: {
    type: Boolean,
    default: true,
  } as PropOptions<boolean>,
  // 只上传图片
  uploadImg: {
    type: Boolean,
    default: true,
  } as PropOptions<boolean>,
};

export const priviewProps = {
  priviewList: {
    type: Array,
    default: () => {
      return [];
    },
  } as PropOptions<UploadResult[]>,
  // 只上传图片
  uploadImg: {
    type: Boolean,
    default: true,
  } as PropOptions<boolean>,
};

export const uploadContainerProps = {
  ...basicProps,
  ...priviewProps,
};
