/**
 * Created by Yuicon on 2017/6/25.
 */
import React, {Component, PropTypes} from 'react';
import {Menu, Input, Icon, Dropdown, message} from 'antd';
import RegisterDialog from '../../components/Header/RegisterDialog';
import LoginDialog from '../../components/Header/LoginDialog';
import {connect} from "react-redux";
import {registerAction, loginAction, currentUserAction} from '../../redux/action/users';
import './Header.css';

@connect(
  (state) => {
    return ({
      users: state.users,
      auth: state.auth,
      currentUser: state.users.get('currentUser'),
    });
  },
  {registerActions: registerAction, loginActions: loginAction, currentUserAction: currentUserAction}
)
export default class Header extends Component {

  static propTypes = {
    currentUser: PropTypes.object,
    users: PropTypes.object,
    auth: PropTypes.object,
    registerActions: PropTypes.func,
    loginActions: PropTypes.func,
    currentUserAction: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      registerDialog: false,
      loginDialog: false,
    };
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    token && this.props.currentUserAction(token);
  }

  handleSelect = ({key}) => {
    switch (key) {
      case 'edit':
        this.props.history.push('/submit-entry');
        break;
      case 'index':
        this.props.history.push('/');
        break;
      case 'login':
        this.setState({loginDialog: true});
        break;
      case 'register':
        this.setState({registerDialog: true});
        break;
      case 'no-login':
        this.setState({loginDialog: true});
        break;
      default:
        console.log(key);
    }
  };

  handleIconClick = () => {
    console.log('handleIconClick', this.state.searchInput);
  };

  handleRegisterDialogClose = () => {
    return () => {
      this.setState({registerDialog: false});
    }
  };

  handleLoginDialogClose = () => {
    return () => {
      this.setState({loginDialog: false});
    }
  };

  handleRedirect = () => {
    console.log('handleRedirect');
    this.setState((state) => ({
      registerDialog: !state.registerDialog,
      loginDialog: !state.loginDialog
    }));
  };

  handleInput = (value) => {
    this.setState({searchInput: value.target.value});
  };

  handleCommand = ({key}) => {
    switch (key) {
      case 'index':
        this.props.history.push(`/user/${this.props.currentUser.username}`);
        break;
      case 'logout':
        localStorage.removeItem('token');
        message.success('??????????????????');
        this.forceUpdate();
        break;
      default:
        console.log(key);
    }
  };

  renderMenu() {
    if (this.props.currentUser) {
      return [
        <Menu.Item key="edit">
          <Icon type="plus" />
        </Menu.Item>,
        <Menu.Item key="8">
          <Icon type="message" />
        </Menu.Item>,
        <Menu.Item key="9">
          <Dropdown trigger={['click']} overlay={(
            <Menu onClick={this.handleCommand}>
              <Menu.Item key="index">????????????</Menu.Item>
              <Menu.Item key="logout">????????????</Menu.Item>
            </Menu>
          )}>
            <div>
              <img src={`https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50`} alt="??????" className="portrait"/>
            </div>
          </Dropdown>
        </Menu.Item>]
    } else {
      return [
        <Menu.Item key="no-login">
          <span className="contribute"><Icon type="copy" />??????</span>
        </Menu.Item>,
        <Menu.Item key="login" className="header-login">
          <span className="login-btn">??????</span>
        </Menu.Item>,
        <Menu.Item key="register" className="header-register">
          <span>??????</span>
        </Menu.Item>]
    }
  };

  render() {

    return (
      <div className="App-header">
        <header className="main-header visible">
          <div className="container">
            <a href="/" className="logo">
              <img src="//gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt="??????" className="logo-img"/>
            </a>
            <div className="nav-menu">
              <Menu defaultSelectedKeys={["index"]} mode="horizontal" onClick={this.handleSelect}>
                <Menu.Item key="index">??????</Menu.Item>
                <Menu.Item key="2">??????</Menu.Item>
                <Menu.Item key="3">?????????</Menu.Item>
                <Menu.Item key="4">??????</Menu.Item>
                <Menu.Item key="5">??????</Menu.Item>
                <Menu.Item key="6">
                  <Input
                    icon="search"
                    suffix={<Icon type="search" onClick={this.handleIconClick}/>}
                    placeholder="????????????"
                    onPressEnter={this.handleIconClick}
                    onChange={this.handleInput}
                  />
                </Menu.Item>
                {this.renderMenu()}
              </Menu>
            </div>
          </div>
          <RegisterDialog visible={this.state.registerDialog} onClose={this.handleRegisterDialogClose()}
                          registerActions={this.props.registerActions} users={this.props.users}
                          onRedirect={this.handleRedirect}
          />
          <LoginDialog visible={this.state.loginDialog} onClose={this.handleLoginDialogClose()}
                       loginActions={this.props.loginActions} auth={this.props.auth}
                       onRedirect={this.handleRedirect}
          />
        </header>
      </div>
    )
  }
}
