import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Avatar, Button, Textarea } from 'evergreen-ui';
import AuthContext from '../../../context/auth-context';

import '../../../assets/css/inbox.css';

const Conversation = ({ onMessage, conversation }) => {
  const { user } = useContext(AuthContext);
  let $replyBar = useRef(null);

  if (!conversation) return <div className="inbox-conversation" />;

  const send = () => {
    onMessage($replyBar.value);
    $replyBar.value = '';
  };

  const { messages } = conversation;
  const partner = conversation.with;

  if (!messages) return <p />;

  const renderConversation = message => (
    <div key={message._id} className="inbox__conversation__message">
      <p>{message.body}</p>
    </div>
  );

  const renderEmptyMessageState = () => (
    <div className="inbox__conversation__no-messages">
      No messages yet!
      <br />
      Send {partner.firstName} a message below
    </div>
  );

  const $messageState =
    messages.length > 0 ? messages.map(renderConversation) : renderEmptyMessageState();

  return (
    <div className="inbox__conversation">
      <div className="inbox__conversation__partner">
        <div className="inbox__conversation__partner__avatar">
          <Avatar
            src={partner.picture}
            size={52}
            name={`${partner.firstName} ${partner.lastName}`}
          />
        </div>
        <h2>
          <Link to={`/profile/${partner._id}`}>
            {partner.firstName} {partner.lastName}
          </Link>
        </h2>
        <Link className="inbox__conversation__partner__cta" to={`/profile/${partner._id}`}>
          <Button iconBefore="people">View profile</Button>
        </Link>
      </div>
      <section className="inbox__conversation__messages">{$messageState}</section>
      <div className="inbox__conversation__reply">
        <Textarea
          innerRef={c => {
            $replyBar = c;
          }}
          placeholder={`Send ${partner.firstName} a message...`}
        />
        <Button onClick={send} className="inbox__conversation__reply__send" iconBefore="people">
          Send message
        </Button>
      </div>
    </div>
  );
};

Conversation.defaultProps = {
  conversation: null
};

Conversation.propTypes = {
  onMessage: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  conversation: PropTypes.object
};

export default Conversation;
