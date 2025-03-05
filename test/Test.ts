import assert from "assert";
import { 
  TestHelpers,
  Monfundme_CampaignClosed
} from "generated";
const { MockDb, Monfundme } = TestHelpers;

describe("Monfundme contract CampaignClosed event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for Monfundme contract CampaignClosed event
  const event = Monfundme.CampaignClosed.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("Monfundme_CampaignClosed is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await Monfundme.CampaignClosed.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualMonfundmeCampaignClosed = mockDbUpdated.entities.Monfundme_CampaignClosed.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedMonfundmeCampaignClosed: Monfundme_CampaignClosed = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      campaignId: event.params.campaignId,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualMonfundmeCampaignClosed, expectedMonfundmeCampaignClosed, "Actual MonfundmeCampaignClosed should be the same as the expectedMonfundmeCampaignClosed");
  });
});
