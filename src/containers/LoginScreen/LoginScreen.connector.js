import {connector} from '../../helpers/app.helper';
import {getUserInfo} from '../../actions/account.actions';
import selector from './LoginScreen.selector';

export default connector({
    actions: {getUserInfo},
    selector,
    needsRouter: true
});
