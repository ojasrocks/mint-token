import React from "react";

export default function Row({ label, value }) {
  return (
    <div>
      <dl>
        <div className="px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium">{label}</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {value}
          </dd>
        </div>
      </dl>
    </div>
  );
}
