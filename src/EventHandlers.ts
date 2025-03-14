import { Factory, Campaign, campaign, donation } from "generated"
import { getCampaignDetails } from "./ViemFunctions"

Factory.CampaignCreated.handlerWithLoader({
    loader: async ({ event, context }) => {

        const [campaign, owner, { description, image, title, target, deadline }] = await Promise.all([
            context.Campaign.get(event.params.campaignAddress),
            context.Account.get(event.params.owner),
            getCampaignDetails(event.params.campaignAddress as `0x${string}`)
        ])

        return {
            campaign,
            owner,
            description,
            image, title, target, deadline
        }
    },
    handler: async ({ event, context, loaderReturn }) => {
        const { campaign, owner, description, image, title, target, deadline } = loaderReturn;

        console.log("Campaign details", { description, image, title, target, deadline })


        if (!campaign) {

            if (!owner) {
                context.Account.set({
                    id: event.params.owner
                });
            }

            const entity: campaign = {
                id: event.params.campaignAddress,
                owner_id: event.params.owner,
                proposalId: event.params.id,
                status: 0,
                deadline: BigInt(deadline as unknown as number),
                description: description,
                image: image,
                title: title,
                targetAmount: BigInt(target as unknown as number),
                currentAmount: BigInt(0),
                isActive: true,
                closedAt: BigInt(0),
                completedAt: BigInt(0),
                targetReachedAt: BigInt(0),
                isCompleted: false,
                isClosed: false,
                hasReachedTarget: false,
                createdAt: BigInt(event.block.timestamp),
            }

            context.Campaign.set(entity)
        }
    }
})

Factory.CampaignCreated.contractRegister(async ({ event, context }) => {
    context.addCampaign(event.params.campaignAddress);
})

Campaign.DonationReceived.handlerWithLoader({
    loader: async ({ event, context }) => {
        const [campaign, donator] = await Promise.all([
            context.Campaign.get(event.srcAddress),
            context.Account.get(event.params.donator)
        ])

        return {
            campaign,
            donator
        }
    },
    handler: async ({ event, context, loaderReturn }) => {
        const { campaign, donator } = loaderReturn;

        if (!donator) {
            context.Account.set({
                id: event.params.donator
            });
        }

        const donation: donation = {
            id: event.transaction.hash,
            campaign_id: event.srcAddress,
            donator_id: event.params.donator,
            amount: event.params.amount,
            timestamp: BigInt(event.block.timestamp)
        }

        context.Donation.set(donation)

        if (campaign) {
            context.Campaign.set({
                ...campaign,
                currentAmount: campaign.currentAmount ? campaign.currentAmount + event.params.amount : event.params.amount
            })
        }
    }
})



Campaign.CampaignCompleted.handlerWithLoader({
    loader: async ({ event, context }) => {
        const campaign = await context.Campaign.get(event.srcAddress)
        return {
            campaign
        }
    },
    handler: async ({ event, context, loaderReturn }) => {
        const { campaign } = loaderReturn;

        if (campaign) {
            context.Campaign.set({
                ...campaign,
                isActive: false,
                isCompleted: true,
                completedAt: BigInt(event.block.timestamp)
            })
        }
    }
})

Campaign.WithdrawalMade.handlerWithLoader({
    loader: async ({ event, context }) => {
        const campaign = await context.Campaign.get(event.srcAddress)
        return {
            campaign
        }
    },
    handler: async ({ event, context, loaderReturn }) => {
        const { campaign } = loaderReturn;

        if (campaign) {
            context.Campaign.set({
                ...campaign,
                isActive: false,
                isClosed: true,
                closedAt: BigInt(event.block.timestamp),
            })
        }
    }
})

