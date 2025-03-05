/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  Monfundme,
  Monfundme_CampaignClosed,
  Monfundme_CampaignCompleted,
  Monfundme_CampaignCreated,
  Monfundme_DonationReceived,
} from "generated";

Monfundme.CampaignClosed.handler(async ({ event, context }) => {
  const entity: Monfundme_CampaignClosed = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    campaignId: event.params.campaignId,
  };

  context.Monfundme_CampaignClosed.set(entity);
});

Monfundme.CampaignCompleted.handler(async ({ event, context }) => {
  const entity: Monfundme_CampaignCompleted = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    event_id: event.params.id,
    amountCollected: event.params.amountCollected,
  };

  context.Monfundme_CampaignCompleted.set(entity);
});

Monfundme.CampaignCreated.handler(async ({ event, context }) => {
  const entity: Monfundme_CampaignCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    campaignId: event.params.campaignId,
    owner: event.params.owner,
    title: event.params.title,
    target: event.params.target,
    deadline: event.params.deadline,
  };

  context.Monfundme_CampaignCreated.set(entity);
});

Monfundme.DonationReceived.handler(async ({ event, context }) => {
  const entity: Monfundme_DonationReceived = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    campaignId: event.params.campaignId,
    donator: event.params.donator,
    amount: event.params.amount,
  };

  context.Monfundme_DonationReceived.set(entity);
});
