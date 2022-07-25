import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

class RequestRow extends Component {
  onApprove = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods
      .approveRequest(this.props.id)
      .send({ from: accounts[0] });
  };

  onFinalize = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods
      .finalizeRequest(this.props.id)
      .send({ from: accounts[0] });
  };

  render() {
    const { Row, Cell } = Table;
    const { description, value, recipient, approvalCount, complete } =
      this.props.request;
    const readyToFinalize = approvalCount > this.props.approversCount / 2;

    return (
      <Row disabled={complete} positive={readyToFinalize && !complete}>
        <Cell>{this.props.id}</Cell>
        <Cell>{description}</Cell>
        <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>{`${approvalCount}/${this.props.approversCount}`}</Cell>
        <Cell>
          {complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {complete ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
