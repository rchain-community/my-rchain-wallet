import React, { Component, Fragment } from 'react';
import styles from './style.less';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { IconFont, InputBlock } from '@/components';

import { Typography, Button, Divider, Input } from 'antd';
import { Link } from 'umi';
import router from 'umi/router';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface IRestoreProps {}

export default class Restore extends Component<IRestoreProps> {
  static defaultProps: IRestoreProps = {};
  state = {
    method: '',
    phrase: '',
    step: 0,
    password: '',
    confirm: '',
    username: '',
    privateKey: '',
  };
  handleStep = (method?: string) => {
    const { step } = this.state;
    if (method) {
      this.setState({ step: step + 1, method });
    } else {
      this.setState({ step: step + 1 });
    }
  };

  goBack = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };
  finish = () => {
    //TODO: real function

    // Check data validity
    router.push('/');
  };

  render() {
    const { method, phrase, step, confirm, password, username, privateKey } = this.state;
    return (
      <div className={styles.container}>
        <Title level={2} style={{ marginBottom: 0 }}>
          {formatMessage({
            id: `user-restore.title`,
          })}
        </Title>
        <Text type={'secondary'} className={styles.description}>
          <FormattedMessage
            id={
              method
                ? `user-restore.method.${method}.description`
                : 'user-restore.title.description'
            }
          />
        </Text>
        <Divider dashed className={styles.divider} />

        {step === 1 ? (
          method === 'phrase' ? (
            <div className={styles.phrase}>
              <div>
                <FormattedMessage id={'user-restore.method.phrase.input.info'} />
              </div>
              <Text type={'secondary'} style={{ fontSize: 12 }}>
                <FormattedMessage id={'user-restore.method.phrase.input.description'} />
              </Text>
              <TextArea
                className={styles.textArea}
                value={phrase}
                onChange={e => {
                  this.setState({
                    phrase: e.target.value,
                  });
                }}
                placeholder={formatMessage({
                  id: 'user-restore.method.phrase.input.placeholder',
                })}
              />
              <Button
                disabled={!phrase}
                type={'primary'}
                className={styles.button}
                onClick={() => this.handleStep()}
              >
                <FormattedMessage id={'user-restore.method.continue'} />
              </Button>
            </div>
          ) : (
            <div className={styles.private}>
              <div>
                <FormattedMessage id={'user-restore.method.private.input.info'} />
              </div>

              <Input
                value={privateKey}
                className={styles.input}
                onChange={e => {
                  this.setState({
                    privateKey: e.target.value,
                  });
                }}
                placeholder={formatMessage({
                  id: 'user-restore.method.private.input.placeholder',
                })}
              />
              <Button
                disabled={!privateKey}
                type={'primary'}
                className={styles.button}
                onClick={() => this.handleStep()}
              >
                <FormattedMessage id={'user-restore.method.continue'} />
              </Button>
            </div>
          )
        ) : step === 2 ? (
          <>
            <div className={styles.password}>
              <InputBlock
                type={'username'}
                label={'user-restore.password.username'}
                value={username}
                onChange={e => this.setState({ username: e.target.value })}
              />
              <InputBlock
                type={'password'}
                label={'user-restore.password.password'}
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
              />
              <InputBlock
                type={'confirm'}
                label={'user-restore.password.confirm'}
                value={confirm}
                onChange={e => this.setState({ confirm: e.target.value })}
              />
              <Button
                disabled={!(username && password && confirm)}
                type={'primary'}
                className={styles.button}
                onClick={this.finish}
              >
                <FormattedMessage id={'user-restore.method.done'} />
              </Button>
            </div>
          </>
        ) : null}
        {step === 0 ? (
          <>
            <div className={styles.method} onClick={() => this.handleStep('private')}>
              <IconFont className={styles.icon} type={'mrw-password'} />
              <div className={styles.card}>
                <Title level={4}>
                  <FormattedMessage id={'user-restore.method.private'} />
                </Title>
                <Text type={'secondary'}>
                  <FormattedMessage id={'user-restore.method.private.description'} />
                </Text>
              </div>
            </div>
            <div className={styles.method} onClick={() => this.handleStep('phrase')}>
              <IconFont className={styles.icon} type={'mrw-brain'} />
              <div className={styles.card}>
                <Title level={4}>
                  <FormattedMessage id={'user-restore.method.phrase'} />
                </Title>
                <Text type={'secondary'}>
                  <FormattedMessage id={'user-restore.method.phrase.description'} />
                </Text>
              </div>
            </div>
          </>
        ) : (
          <Button type={'link'} onClick={() => this.goBack()}>
            <FormattedMessage id={'user-restore.method.return'} />
          </Button>
        )}
        <Divider dashed className={styles.divider} />
        <FormattedMessage
          id={'user-restore.other'}
          values={{
            sign: (
              <Link to={'/user/login'}>{formatMessage({ id: 'user-restore.other.sign' })}</Link>
            ),
            create: (
              <Link to={'/user/signup'}>{formatMessage({ id: 'user-restore.other.create' })}</Link>
            ),
          }}
        />
      </div>
    );
  }
}