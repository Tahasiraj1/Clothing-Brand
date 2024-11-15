import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="px-10 py-10 flex flex-col gap-5">
      <h1 className='font-bold text-4xl items-center flex justify-center'>Privacy Policy</h1>
      <p>Effective Date: [Insert Date]</p>

      <section>
        <h2 className='font-bold text-xl mb-2'>Introduction</h2>
        <p>
          Welcome to [Your Brand Name]. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, and safeguard your information.
        </p>
      </section>

      <section>
        <h2 className='font-bold text-xl mb-2'>Information We Collect</h2>
        <p className='font-bold text-lg mb-2'>We collect information in the following ways:</p>
        <ul>
          <li>
            <strong>1. Personal Information:</strong> When you make a purchase, register an account, or interact with our website, we collect information such as your name, email address, phone number, and shipping/billing address.
          </li>
          <li>
            <strong>2. Payment Information:</strong> Payment details, such as your credit card number, are processed through a secure third-party payment processor and are not stored by us.
          </li>
          <li>
            <strong>3. Browsing Information:</strong> We collect data about your interactions with our website (e.g., pages viewed, time spent on the site) using cookies and similar tracking technologies.
          </li>
        </ul>
      </section>

      <section>
        <h2 className='font-bold text-lg mb-2'>How We Use Your Information</h2>
        <p className='mb-2'><strong>We use the collected information for various purposes, including:</strong></p>
        <ul>
          <li><strong>1. </strong>Processing and fulfilling orders</li>
          <li><strong>2. </strong>Communicating with you about your order, offers, and promotions</li>
          <li><strong>3. </strong>Improving our website, products, and customer service</li>
          <li><strong>4. </strong>Analyzing website performance and user trends</li>
        </ul>
      </section>

      <section>
        <h2 className='font-bold text-lg mb-2'>Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your experience on our site, analyze trends, and provide personalized content. You can control cookie settings in your browser, but some features of our site may not function properly if you disable cookies.
        </p>
      </section>

      <section>
        <h2 className='font-bold text-lg mb-2'>Sharing of Information</h2>
        <p className='mb-2'><strong>We do not sell, trade, or otherwise transfer your personal information to outside parties, except:</strong></p>
        <ul>
          <li>To trusted third-party service providers that assist us in operating our website, conducting our business, or servicing you</li>
          <li>When required by law or to protect our rights, property, or safety.</li>
        </ul>
      </section>

      <section>
        <h2 className='font-bold text-lg mb-2'>Your Rights</h2>
        <p className='mb-2'><strong>Depending on your jurisdiction, you may have the following rights regarding your personal information:</strong></p>
        <ul>
          <li><strong>1. </strong>The right to access, correct, or delete your information</li>
          <li><strong>2. </strong>The right to restrict or object to our processing of your data</li>
          <li><strong>3. </strong>The right to data portability</li>
          <li><strong>4. </strong>The right to withdraw consent where we rely on consent for data processing</li>
        </ul>
        <p>To exercise these rights, please contact us at [Your Contact Information].</p>
      </section>

      <section>
        <h2 className='font-bold text-lg mb-2'>Security of Your Information</h2>
        <p>
          We take appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no internet transmission is completely secure, and we cannot guarantee the security of your information.
        </p>
      </section>

      <section>
        <h2 className='font-bold text-lg mb-2'>Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
        </p>
      </section>

      <section>
        <h2 className='font-bold text-lg mb-2'>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at [Your Contact Email].</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
