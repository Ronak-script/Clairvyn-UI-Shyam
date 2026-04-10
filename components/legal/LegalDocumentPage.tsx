import Link from "next/link"

type LegalDocumentPageProps = {
  title: string
  effectiveDate: string
  body: string
}

/**
 * Legal / policy text: single column scroll on the document (no nested pre scrollbar).
 * touch: larger type for phones; desktop: compact filing-cabinet sizes unchanged.
 */
export function LegalDocumentPage({ title, effectiveDate, body }: LegalDocumentPageProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-gray-900">
      <div className="mx-auto w-full px-6 py-12 desktop:px-8">
        <div className="max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold text-gray-500 transition-colors hover:text-gray-700 touch:min-h-10 desktop:min-h-0 desktop:text-[10px] mb-8"
          >
            ← Back to home
          </Link>

          <h1 className="text-lg font-bold leading-tight text-gray-900 touch:mt-3 desktop:mt-2 desktop:text-sm desktop:font-semibold tracking-tight mb-2">
            {title}
          </h1>
          <p className="mt-1 text-[11px] text-gray-500 touch:mt-2 desktop:mt-0 desktop:text-[10px] desktop:leading-snug desktop:text-gray-600 mb-12 pb-8 border-b border-gray-200">
            {effectiveDate}
          </p>

          <div
            className="max-w-none font-sans break-words whitespace-pre-wrap text-gray-800 desktop:text-[11px] desktop:leading-relaxed space-y-4 [&_*]:mb-6"
          >
            {body}
          </div>

          {/* Additional spacer to simulate multiple pages */}
          <div className="mt-16 pt-16 border-t border-gray-300 space-y-4">
            <div className="h-[600px] flex flex-col justify-between text-[11px] leading-relaxed text-gray-700">
              <div className="space-y-3 text-justify">
                <p>Continuation of Terms and Conditions. This document represents a legally binding agreement and should be read in its entirety. Users must understand all provisions contained herein before proceeding with the use of services. All sections are equally important and material to this agreement. Failure to read any section does not excuse non-compliance with its terms.</p>
                <p>Additional Legal Provisions and Supplementary Terms. The following provisions constitute integral parts of this agreement and are binding upon all parties. These terms apply in addition to those stated above and supersede any conflicting provisions in earlier sections. Please review carefully.</p>
                <p>Further Disclaimers and Limitations of Liability. The company assumes no responsibility for any indirect, incidental, special, consequential, or punitive damages arising from use of the service. All warranties, express or implied, are disclaimed to the fullest extent permitted by law. The user assumes all risk associated with use.</p>
                <p>Indemnification and Hold Harmless Clause. User agrees to indemnify, defend, and hold harmless the company from any claims, damages, losses, liabilities, and expenses arising from user's use of the service or violation of these terms.</p>
              </div>
            </div>
          </div>

          {/* More pages */}
          <div className="mt-16 pt-16 border-t border-gray-300 space-y-4">
            <div className="h-[700px] flex flex-col justify-between text-[11px] leading-relaxed text-gray-700">
              <div className="space-y-3 text-justify">
                <p>Governing Law and Jurisdiction. These terms shall be governed by and construed in accordance with the applicable laws without regard to conflict of law principles. You irrevocably submit to the exclusive jurisdiction of the courts in the specified venue.</p>
                <p>Severability. If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect. The unenforceable provision shall be modified to the minimum extent necessary to make it enforceable.</p>
                <p>Entire Agreement. These terms, together with all incorporated agreements and documents, constitute the entire agreement between the parties and supersede all prior negotiations, representations, and understandings, whether written or oral.</p>
                <p>Amendment and Modification. The company reserves the right to modify these terms at any time. Continued use of the service after modifications constitutes acceptance of the revised terms. It is the user's responsibility to review these terms periodically.</p>
                <p>Waiver. No waiver of any provision shall be effective unless in writing and signed by an authorized representative. Failure to enforce any right does not constitute a waiver of that right.</p>
              </div>
            </div>
          </div>

          {/* Even more pages */}
          <div className="mt-16 pt-16 border-t border-gray-300 space-y-4">
            <div className="h-[650px] flex flex-col justify-between text-[11px] leading-relaxed text-gray-700">
              <div className="space-y-3 text-justify">
                <p>Survival. The provisions that by their nature should survive termination, including but not limited to indemnification, limitation of liability, and intellectual property provisions, shall survive any termination or expiration of these terms.</p>
                <p>Force Majeure. The company shall not be liable for any failure or delay in performance under these terms due to causes beyond its reasonable control, including but not limited to acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages.</p>
                <p>Notice and Communication. All notices required under these terms shall be in writing and delivered personally, by email, or by certified mail. Notices to the user shall be sent to the email address associated with the user's account.</p>
                <p>Assignment. User may not assign these terms or any rights hereunder without the prior written consent of the company. The company may assign these terms to any successor or affiliate without notice.</p>
                <p>Third-Party Rights. Except as expressly stated, these terms do not grant any third-party beneficiary rights. No third party has any right to enforce any provision of these terms.</p>
              </div>
            </div>
          </div>

          {/* Final page of legalese */}
          <div className="mt-16 pt-16 border-t border-gray-300 space-y-4 pb-24">
            <div className="h-[700px] flex flex-col justify-between text-[11px] leading-relaxed text-gray-700">
              <div className="space-y-3 text-justify">
                <p>Counterparts. These terms may be executed in any number of counterparts, each of which shall be deemed an original and all of which together shall constitute one and the same instrument.</p>
                <p>Headings. Section headings are for convenience only and do not affect the interpretation or meaning of these terms.</p>
                <p>Construction. No provision shall be construed against the party that drafted it. These terms shall be fairly construed according to their terms and not strictly for or against any party.</p>
                <p>Cumulative Remedies. All remedies available under these terms are cumulative and in addition to any other remedies available at law or in equity.</p>
                <p>Authority. By accessing this service, you represent and warrant that you have the full right and authority to enter into this agreement and to be bound by its terms and conditions. If you are entering into this agreement on behalf of a company or organization, you represent that you have been duly authorized to do so.</p>
                <p>Acknowledgment. You acknowledge that you have read these terms in their entirety, understand their contents, and agree to be bound by all provisions therein. If you do not agree to any term or condition, you must immediately cease use of the service and delete your account.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
