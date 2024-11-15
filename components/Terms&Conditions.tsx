import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="px-10 py-10 flex flex-col gap-5">
      <h1 className='font-bold text-4xl items-center flex justify-center'>Terms and Conditions</h1>
      <p>Effective Date: [Insert Date]</p>

      <section>
        <h2 className='font-bold text-xl mb-2'>Introduction</h2>
        <p>
          Welcome to [Your Brand Name]. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully. If you do not agree to these terms, you should not use our website.
        </p>
      </section>

      <section>
        <h2 className='font-bold text-xl mb-2'>Order Processing and Payment</h2>
        <p>
          By placing an order on our website, you agree to provide current, complete, and accurate information. We reserve the right to refuse or cancel any order if fraud or unauthorized activity is suspected. All prices are listed in [Your Currency] and are subject to change without notice.
        </p>
      </section>

      <section>
        <h2 className='font-bold text-xl mb-2'>Shipping and Delivery</h2>
        <p>
          We aim to process and ship your order as quickly as possible. Shipping times and rates may vary based on your location and the shipping option chosen at checkout. [Your Brand Name] is not responsible for delays caused by customs or other circumstances beyond our control.
        </p>
      </section>

      <section>
        <h2 className='font-bold text-xl mb-2'>Returns and Exchanges</h2>
        <p>
          We want you to be happy with your purchase. If you are not satisfied, please refer to our Returns and Exchanges Policy [link to policy]. Items must be returned in their original condition within [X days] from the date of receipt. Please note that sale items and customized products may be non-returnable.
        </p>
      </section>

      <section>
        <h2 className='font-bold text-xl mb-2'>User Conduct</h2>
        <p>
          You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behaviors include harassment, causing distress or inconvenience to any other user, and distributing obscene or offensive content.
        </p>
      </section>

      <section>
        <h2 className='font-bold text-xl mb-2'>Intellectual Property</h2>
        <p>
          All content, trademarks, and logos on this site are the property of [Your Brand Name] or its licensors and are protected by intellectual property laws. Unauthorized use, reproduction, or distribution of this content is prohibited.
        </p>
      </section>

      <section>
        <h2 className='font-bold text-xl mb-2'>Limitation of Liability</h2>
        <p>
          [Your Brand Name] shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products purchased through it. Our liability is limited to the maximum extent permitted by law.
        </p>
      </section>

      <section>
        <h2 className='font-bold text-xl mb-2'>Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless [Your Brand Name] and its affiliates from any claims, liabilities, damages, losses, or expenses arising out of your violation of these terms or your use of our website.
        </p>
      </section>

      <section>
        <h2 className='font-bold text-xl mb-2'>Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising from or relating to these terms shall be subject to the exclusive jurisdiction of the courts of [Your Jurisdiction].
        </p>
      </section>

      <section>
        <h2 className='font-bold text-xl mb-2'>Changes to Terms and Conditions</h2>
        <p>
          We reserve the right to update or modify these terms at any time without prior notice. Any changes will be posted on this page with an updated effective date. Your continued use of our website after changes are posted constitutes your acceptance of the revised terms.
        </p>
      </section>

      <section>
        <h2 className='font-bold text-xl mb-2'>Contact Us</h2>
        <p>If you have any questions about these Terms and Conditions, please contact us at [Your Contact Email].</p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
