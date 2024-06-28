import { EditableMessage } from '@lobehub/ui';
import { useResponsive } from 'antd-style';
import { type ReactNode, memo, useEffect, useRef } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ChatItemProps } from '@/components/ChatItem';

import { useStyles } from '../style';

export interface MessageContentProps {
  editing?: ChatItemProps['editing'];
  fontSize?: number;
  message?: ReactNode;
  messageExtra?: ChatItemProps['messageExtra'];
  onChange?: ChatItemProps['onChange'];
  onDoubleClick?: ChatItemProps['onDoubleClick'];
  onEditingChange?: ChatItemProps['onEditingChange'];
  placement?: ChatItemProps['placement'];
  primary?: ChatItemProps['primary'];
  renderMessage?: ChatItemProps['renderMessage'];
  text?: ChatItemProps['text'];
  type?: ChatItemProps['type'];
}

const MessageContent = ({
  editing,
  onChange,
  onEditingChange,
  text,
  message,
  placement,
  messageExtra,
  renderMessage,
  type,
  primary,
  onDoubleClick,
  fontSize,
}: MessageContentProps) => {
  const { cx, styles } = useStyles({ editing, placement, primary, type });
  const { mobile } = useResponsive();
  const ref = useRef<HTMLDivElement>(null);

  const content = (
    <EditableMessage
      classNames={{ input: styles.editingInput }}
      editButtonSize={'small'}
      editing={editing}
      fontSize={fontSize}
      fullFeaturedCodeBlock
      onChange={onChange}
      onEditingChange={onEditingChange}
      openModal={mobile ? editing : undefined}
      text={text}
      value={message ? String(message).trim() : ''}
    />
  );
  const messageContent = renderMessage ? renderMessage(content) : content;

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [message]);

  return (
    <Flexbox
      ref={ref}
      className={cx(styles.message, editing && styles.editingContainer)}
      onDoubleClick={onDoubleClick}
    >
      {messageContent}
      {messageExtra && !editing ? <div className={styles.messageExtra}>{messageExtra}</div> : null}
    </Flexbox>
  );
};

export default memo(MessageContent);
