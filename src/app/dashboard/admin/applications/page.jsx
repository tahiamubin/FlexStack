import { getAppliedTrainer } from "@/lib/api/trainer";
import React from "react";
import TrainerApplicationsClient from "../../TrainerApplicationsClient";
import { getUserSession } from "@/lib/core/session";

const page = async () => {
  const applications = await getAppliedTrainer();
 

  return (
    <div className="p-6">
      <TrainerApplicationsClient applications={applications} />
    </div>
  );
};

export default page;
