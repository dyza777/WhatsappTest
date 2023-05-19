import {connector} from '../../helpers/app.helper';
import {sendMessage, getChatMessages} from '../../actions/messages.actions.js';
import selector from './ChatScreen.selector';

export default connector({
    actions: {sendMessage, getChatMessages},
    selector,
    needsRouter: true
});
