import {
  Campaign,
  Campaign_CampaignClosed,
  Campaign_CampaignCompleted,
  Campaign_DonationReceived,
  Campaign_FeePaid,
  Campaign_StatusUpdated,
  Campaign_TargetReached,
  Campaign_WithdrawalMade,
  Factory,
  Factory_CampaignCreated,
} from "generated";

Factory.CampaignCreated.handler(async ({ event, context }) => {
  const entity: Factory_CampaignCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    campaignAddress: event.params.campaignAddress,
    owner: event.params.owner,
    event_id: event.params.id,
  };

  context.Factory_CampaignCreated.set(entity);
});

Factory.CampaignCreated.contractRegister(async ({ event, context }) => {
  context.addCampaign(event.params.campaignAddress)
}, { preRegisterDynamicContracts: true })

Campaign.CampaignClosed.handler(async ({ event, context }) => {
  const entity: Campaign_CampaignClosed = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    campaignAddress: event.srcAddress,
    timestamp: event.params.timestamp,
  };

  context.Campaign_CampaignClosed.set(entity);
});

Campaign.CampaignCompleted.handler(async ({ event, context }) => {
  const entity: Campaign_CampaignCompleted = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    campaignAddress: event.srcAddress,
    amountCollected: event.params.amountCollected,
  };

  context.Campaign_CampaignCompleted.set(entity);
});

Campaign.DonationReceived.handler(async ({ event, context }) => {
  const entity: Campaign_DonationReceived = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    campaignAddress: event.srcAddress,
    donator: event.params.donator,
    amount: event.params.amount,
    transactionHash: event.transaction.hash,
  };

  context.Campaign_DonationReceived.set(entity);
});

Campaign.FeePaid.handler(async ({ event, context }) => {
  const entity: Campaign_FeePaid = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    campaignAddress: event.srcAddress,
    to: event.params.to,
    amount: event.params.amount,
    transactionHash: event.transaction.hash,
  };

  context.Campaign_FeePaid.set(entity);
});

Campaign.StatusUpdated.handler(async ({ event, context }) => {
  const entity: Campaign_StatusUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    campaignAddress: event.srcAddress,
    newStatus: event.params.newStatus,
  };

  context.Campaign_StatusUpdated.set(entity);
});

Campaign.TargetReached.handler(async ({ event, context }) => {
  const entity: Campaign_TargetReached = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    campaignAddress: event.srcAddress,
    timestamp: event.params.timestamp,
  };

  context.Campaign_TargetReached.set(entity);
});

Campaign.WithdrawalMade.handler(async ({ event, context }) => {
  const entity: Campaign_WithdrawalMade = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    campaignAddress: event.srcAddress,
    to: event.params.to,
    amount: event.params.amount,
    transactionHash: event.transaction.hash,
  };

  context.Campaign_WithdrawalMade.set(entity);
});


