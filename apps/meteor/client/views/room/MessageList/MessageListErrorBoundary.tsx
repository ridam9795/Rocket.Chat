import { States, StatesIcon, StatesTitle, StatesSubtitle, StatesActions, StatesAction, Icon } from '@rocket.chat/fuselage';
import React, { ReactElement, ReactNode } from 'react';

import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useTranslation } from '../../../contexts/TranslationContext';

const MessageListErrorBoundary = ({ children }: { children: ReactNode }): ReactElement => {
	const t = useTranslation();
	return (
		<ErrorBoundary
			children={children}
			fallback={
				<States>
					<StatesIcon name='circle-exclamation' variation='danger' />
					<StatesTitle>{t('Error')}</StatesTitle>
					<StatesSubtitle>{t('Error_something_went_wrong')}</StatesSubtitle>
					<StatesActions>
						<StatesAction
							onClick={(): void => {
								location.reload();
							}}
						>
							<Icon name='reload' /> {t('Reload')}
						</StatesAction>
					</StatesActions>
				</States>
			}
		/>
	);
};

export default MessageListErrorBoundary;
