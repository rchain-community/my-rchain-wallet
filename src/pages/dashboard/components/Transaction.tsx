import React, { Component } from 'react';
import styles from './Transaction.less';
import { formatMessage, FormattedMessage } from 'umi-plugin-locale';
import { ITransaction } from '../index';
import moment from 'moment';

import { Tag, Card, Typography, Avatar, Button } from 'antd';

const { Text } = Typography;

interface ITransactionInnerProps {}

interface ITransactionProps extends ITransactionInnerProps {
  transaction: ITransaction[];
  token: string;
}

export default class Transaction extends Component<ITransactionProps> {
  static defaultProps: ITransactionInnerProps;

  render() {
    const { transaction, token } = this.props;
    console.log(transaction);
    return (
      <Card
        className={styles.container}
        title={
          <div>
            <FormattedMessage id={'dashboard.transaction.title'} />
            <Tag>Demo</Tag>
          </div>
        }
        bordered={false}
      >
        <div className={styles.list}>
          {transaction.map(bill => {
            const { number, status, timestamp, title, type } = bill;

            return (
              <div className={styles.item}>
                <Avatar src={'21312341'} className={styles.icon} />

                <div className={styles.info}>
                  <div>{title}</div>
                  <div>
                    <Text type={'secondary'}>{moment(timestamp).format('MMM Do, hh:mm:ss A')}</Text>
                  </div>
                </div>
                <div>
                  <Tag color={status === 'checked' ? 'green' : 'magenta'} className={styles.tag}>
                    {status === 'checked' ? 'Confirmed' : 'Unconfirmed'}
                  </Tag>
                </div>
                <div
                  className={`${styles.money} ${type === 'send' ? styles.send : styles.receive}`}
                >{`${type === 'send' ? '-' : '+'}${number.toFixed(2)} ${token.toUpperCase()}`}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.bottom}>
          <Button type={'link'} className={styles.more}>
            <FormattedMessage id={'dashboard.transaction.more'} />
          </Button>
        </div>
      </Card>
    );
  }
}
