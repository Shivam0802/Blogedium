import React,{ useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

function Faq() {
        const [openIndex, setOpenIndex] = useState(null);

        const toggleFAQ = (index) => {
            setOpenIndex(openIndex === index ? null : index);
        };

        const faqs = [
            {
                question: "What is Blogedium?",
                answer: "Blogedium is a platform where you can read and share diverse topics, thoughts, and stories. It’s a vibrant community of bloggers from around the world."
            },
            {
                question: "How do I publish a blog on Blogedium?",
                answer: "After logging in, click the \"Publish your Blog\" button on the homepage. A modal will appear where you can write and submit your blog."
            },
            {
                question: "How can I find blogs on specific topics?",
                answer: "Use the search bar on the homepage to search for blogs by keywords. You can also browse blogs by categories listed on the sidebar."
            },
            {
                question: "How do I change my password?",
                answer: "Go to your profile settings, select \"Account Settings,\" and then \"Change Password.\" Follow the instructions to update your password."
            },
            {
                question: "Why can't I see my blog after publishing?",
                answer: "This could be due to a caching issue or a delay in publishing. Try refreshing the page. If the issue persists, contact our support team."
            },
        ];

        return (
            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                        <button
                            className={`w-full px-5 py-4 text-left ${openIndex === index ? 'bg-purple-50' : 'bg-white'} hover:bg-slate-50 focus:outline-none transition-colors`}
                            onClick={() => toggleFAQ(index)}
                        >
                            <span className={`font-medium text-base ${openIndex === index ? 'text-[#7C3AED]' : 'text-slate-800'}`}>
                                {index + 1}. {faq.question}
                            </span>
                            {openIndex === index ? (
                                <MdOutlineKeyboardArrowUp className="inline-block float-right text-xl text-[#7C3AED]" />
                            ) : (
                                <MdOutlineKeyboardArrowDown className="inline-block float-right text-xl text-slate-600" />
                            )}
                        </button>
                        {openIndex === index && (
                            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
                                <p className="text-sm text-slate-700 leading-relaxed">{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    export default Faq;