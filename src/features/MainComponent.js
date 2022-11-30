import React from 'react';
import { Grid, Segment, Header, Icon } from 'semantic-ui-react';
import UploadImageComponent from './uploadImages/UploadImageComponent'
import '../style/main.css'


export default function MainComponent() {
    return (
            <div>
                <div className="mainDiv">
                    <Grid>
                        <Grid.Row stretched>
                            <Grid.Column>
                                <Segment placeholder>
                                    <Header icon>
                                        <Icon data-testid='cloudUploadIcon' name='cloud upload' />
                                        <UploadImageComponent/>
                                    </Header>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>

                <div className="footer" data-testid='footer'>
                    <div className="buildAndCopyright">
                        <div data-testid="copyright">Copyright © 2022 P.Karkanis</div>
                    </div>
                </div>
            </div>
    );
}
