import { CheckIcon } from "../icons/check/Check";
import { ExternalLinkIcon } from "../icons/link/Link";
import noticeBadgeStyle from "./notice-badge.module.css";

export type NoticeBadgeProps = {
  title: string;
  text: string;
  linkUrl?: string;
  linkText?: string;
};

export const NoticeBadge = ({
  title,
  text,
  linkUrl,
  linkText = "Learn more",
}: NoticeBadgeProps) => {
  return (
    <div className={noticeBadgeStyle.noticeBadge}>
      <CheckIcon />
      <div className={noticeBadgeStyle.noticeBadgeContent}>
        <div className={noticeBadgeStyle.noticeBadgeTitle}>{title}</div>
        <div className={noticeBadgeStyle.noticeBadgeText}>{text}</div>
        {linkUrl && (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={noticeBadgeStyle.noticeBadgeLink}
          >
            {linkText}
            <ExternalLinkIcon />
          </a>
        )}
      </div>
    </div>
  );
};
