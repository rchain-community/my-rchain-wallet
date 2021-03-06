import React, { Component } from 'react';
import styles from './Token.less';
import { formatMessage, FormattedMessage } from 'umi-plugin-locale';

import { MoreOutlined } from '@ant-design/icons';

import { Avatar, Card, Typography, Button, Tag } from 'antd';
type TokenData = {
  name: string;
  img: string;
};
const { Text } = Typography;
interface ITokenInnerProps {}

interface ITokenProps extends ITokenInnerProps {
  tokenList: TokenData[];
  selectedToken: string;
}
export default class Token extends Component<ITokenProps> {
  static defaultProps: ITokenInnerProps;

  render() {
    const { tokenList, selectedToken } = this.props;
    return (
      <Card
        className={styles.container}
        title={
          <div>
            <FormattedMessage id={'dashboard.token.title'} /> <Tag>Demo</Tag>
          </div>
        }
        bordered={false}
      >
        {tokenList.map(token => {
          const { name, img } = token;
          const isSelected = selectedToken === name;
          return (
            <div key={name} className={styles.list + ` ${isSelected ? styles.selected : null}`}>
              <Avatar src={img} className={styles.logo} />
              <div className={styles.name}>{name}</div>
              <div className={styles.action}>
                <MoreOutlined />
              </div>
            </div>
          );
        })}
        <div className={styles.bottom}>
          <Text type={'secondary'}>
            <FormattedMessage
              id={'dashboard.token.add'}
              values={{
                add: (
                  <Button type={'link'} className={styles.add}>
                    <FormattedMessage id={'dashboard.token.add.click'} />
                  </Button>
                ),
              }}
            />
          </Text>
        </div>
      </Card>
    );
  }
}
